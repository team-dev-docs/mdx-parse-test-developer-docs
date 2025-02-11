---
title: "Release: Terraform v2"
description: "Updated Terraform generation that handles increasingly complex APIs."
image: "/media/release-terraform-generation-v2.png"
date: 2024-02-27
authors:
  - name: Thomas Rooney
  - image_url: '/media/author-headshots/thomas.jpeg'
tags:
  - Product Updates
featured_image: "/media/release-terraform-generation-v2.png"
---

Offering a Terraform provider for your API is one of the best ways to unlock new use cases and new revenue. Since we rolled out our provider generation, we’ve been making steady improvements behind the scenes, like migrating to the terraform-plugin-framework from terraform-plugin-sdk/v2.  That’s meant continuity for our users without any action needed from their teams. But now we’re excited to share some new capabilities that expand the product offering.

The next version of our OpenAPI-based Terraform Provider generation is now available to all users. Our new generation is able to handle increasingly complex API patterns and produce the corresponding Terraform resources as expected.

So what’s now possible?

- Collapse multiple API endpoints into a single Terraform Entity.
- Adding Custom Plan Validators to your Provider
- Runtime Validations
- Support for Default and Const Attributes
- Handling Batch Endpoints

To get started, all you need is an OpenAPI spec. Simply install the speakeasy CLI, annotate your spec and start generating:

```bash
brew install speakeasy-api/homebrew-tap/speakeasy
```

```bash
speakeasy quickstart
```

## New Features

### Multi-endpoint Resources

As APIs age and grow, they inevitably develop some rough edges. A common situation is one where a user needs to interface with multiple endpoints to configure a single business resource. Imagine a case where a user makes a call to create a transaction, then a second call to tag the transaction. It’s not a big problem, but the ideal devex would be a single API call that creates a transaction, including tagging data.

With our new support for multi-endpoint resources, it’s now possible to collapse two calls into a single entity definition in your Terraform Provider. This frees your users from needing to manage complex entities that span multiple API calls for their lifecycle operations.

All you need to do is add `x-speakeasy-entity-operation` annotations to the API endpoints you want to collapse:

```yaml
/drinks:
  post:
    x-speakeasy-entity-operation: Drink#create
    requestBody:
      required: true
      content:
        application/json:
        schema:
          x-speakeasy-entity: Drink
          type: object
          properties:
            name:
              description: The name of the drink.
              type: string
            type:
              description: The type of drink.
              type: string
              enum:
              - cocktail
              - non-alcoholic
              - beer
              - wine
            price:
              description: The price of one unit of the drink in US cents.
              type: number
      responses:
        "200":
          content:
          application/json:
            schema:
            type: object
            properties:
              data:
                type: object
                x-speakeasy-entity: Drink
                properties:
                    ...
  /drink/{id}/visibility:
    post:
      x-speakeasy-entity-operation: Drink#create#2
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              x-speakeasy-entity: Drink
              properties:
                visibility:
                  type: string
                  enum:
                    - above-bar
                    - below-bar
      responses:
```

The resulting Terraform entity will look like:

```go
func (r *DrinkResource) Schema(ctx context.Context, req resource.SchemaRequest, resp *resource.SchemaResponse) {
  resp.Schema = schema.Schema{
    MarkdownDescription: "Drink Resource",

    Attributes: map[string]schema.Attribute{
      "type": schema.StringAttribute{
        Optional:    true,
        Computed:    true
        Description: `The type of drink.`,
        stringvalidator.OneOf(
          "cocktail",
          "non-alcoholic",
          "beer",
          "wine",
        ),
      },
      "name": schema.StringAttribute{
        Required:    true,
        Description: `The name of the drink.`,
      },
      "price": schema.Int64Attribute{
        Required:    true,
        Description: `The price of one unit of the drink in US cents.`,
      },
      "type": schema.StringAttribute{
        Optional:    true,
        Computed:    true
        Description: `The visibility of drink.`,
        stringvalidator.OneOf(
          "above-bar",
          "below-bar",
        ),
      },
    },
  }
}
```

And we'd syncronously invoke the first API request followed by the second API request during the `Drink` resource `Create` step. Any attributes that the first API call returns will be available to the following API call, and all of the data returned by both API calls will be made available to terraform state.

There's no limit on the amount of chaining that you can do. For instance, an `x-speakeasy-entity-operation: MYEntity#Read#1..N` could invoke many API calls and merge all of the responses together into a gigantic data source to simplify user interactions with your resources.

### Custom Plan Validators

Plan validators are additional validation checks that are applied to your user’s Terraform execution plan before any changes are applied to the infrastructure. By default, we provide basic validation based on your OpenAPI spec, for example checking that `min` and `max` limits are being respected. But we now also provide the ability for you to define your own custom validators which will enforce specific pieces of business logic for your users.

Just annotate the schema in your OpenAPI spec with `x-speakeasy-plan-validators: MyValidator`, and we'll create a `internal/validators/stringvalidators/sell_by_validator.go` file that's bootstrapped to be compliant with what the `terraform-plugin-framework` expects, and ready for your logic to be written. You can re-use the validator by applying it to any other JSON Schema type with the same underlying `type`. See our [full implementation notes here](/docs/terraform/extensions#the-x-speakeasy-plan-validators-extension).

```yaml
components:
  schemas:
    Drink:
      type: object
      x-speakeasy-entity: Drink
      properties:
        name:
          type: string
        sell-by:
          type: string
          format: date-time
          x-speakeasy-plan-validators: SellByValidator
```

### Default Parameter/Request Body Support

There is now support for `default` across parameters and request body attributes. If your OpenAPI spec defines a default value for a parameter, we will now propagate that into the Terraform entity:

```yaml
- in: query
  name: deprecated
  schema:
    type: boolean
    default: false
  description: Indicates if the product is deprecated
```

```go
"deprecated": schema.BoolAttribute{
  Computed:    true,
  Optional:    true,
  Default:     booldefault.StaticBool(false),
  Description: `Indicates if the product is deprecated. Default: false`,
},
```

### Const Request Body Support

There is now support for `const` across request body attributes. If your OpenAPI spec defines a const value for any request attribute, we will now hide that value from the Terraform Entity and propagate it over the wire to your API. This can allow for an optimized terraform interface, especially for discriminators of `oneOf` types:

```yaml
oneOf:
  - type: object
    properties:
      sourceType:
        type: string
        const: "SourceType 1"
      ...
  - type: object
    properties:
      sourceType:
        type: string
        const: "SourceType 2"
      ...
```

### Array Batch Method Support

Terraform doesn’t support traditional parallelism: all interactions most be with a single resource. However if your API only has batch create & batch update endpoints, our generation target can support using these too!

Our provider will create API calls with single element arrays request/response values to interact with the single resource operations, but flatten these into a terraform schema that’s consistent with user expectations.
