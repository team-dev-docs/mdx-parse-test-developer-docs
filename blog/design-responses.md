---
title: "Designing REST APIs: Responses Your Users Expect"
description: "Practical strategies for designing efficient, informative, and user-friendly API responses."
image: "/media/design-responses.png"
date: 2024-08-06
authors:
 - name: Nolan Sullivan
 - image_url: "/media/author-headshots/nolan.jpeg"
tags:
  - API Advice
featured_image: "/media/design-responses.png"
---

This article shows you how to use your OpenAPI specification to design API responses that are efficient, informative, and user-friendly.

## User-First Design

API requests are only as useful as their responses. So, to design a useful API, you must consider how to structure responses that make sense for your users. A good user experience requires an API that either responds with appropriate data or tells users how to recover from errors.

One way to enhance user experience is to take the _design-first approach_: Write your OpenAPI specification before you code. Starting from a specification puts the user experience at the first step of the development process. The specification has well-defined properties for schemas and responses, which helps you consider how to structure your design. Designing first also helps contain development scope, since developers can code to a precise specification.

This article is a guide to using the OpenAPI specification to design responses. Regardless of whether your API returns a successful ‘200’ status code or an error with a ‘500’ status code, OpenAPI provides you with the tools and methodologies to meticulously design your API responses for optimal performance and seamless user experiences. In the following sections, we will delve into the key principles and best practices to ensure your API responses meet the highest standards of usability, efficiency, and effectiveness.

## Principles of Good API Style

Before you start writing responses, consider the following guiding principles of API design.
From data structure to error messages, these principles should inform every aspect of how you approach responses.

### Be as Explicit as Possible

Describe the data the API returns as explicitly as possible. The more explicit and precise you are, the easier it is for users and their systems to interpret returned values.

The OpenAPI Specification has many properties to describe a data field. Every field requires a defined data type. Beyond this, when possible, also provide additional information about the data format and range, for example, a string may have `minLength` and `maxLength` values. Precise and predictable information helps users handle responses.

Also be explicit in how you name your data properties. Overly general names (like `type`) describe many things. More specific names (like `userType`) immediately provide context about their data.

Explicitness also helps users interpret response descriptions. For example, `List of users` is not as helpful as `List of users with active subscriptions`.

### Be Consistent

Most schemas in OpenAPI can be referenced and reused. Reuse adds consistency and makes writing easier.

Consistent naming conventions make it easier for computers and humans to process information. Consistent response descriptions with parallel grammar and coherent phrasing make response bodies easier to read and interpret.

### Prefer Flat... Until You Need to Nest

As the [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml) recommends, "data should not be arbitrarily grouped." Group data in objects only when the grouping makes semantic sense and is more convenient.

Each nested object in the specification requires another level of indentation. Be mindful of this indentation – too much might indicate that it's time to refactor.

Of course, information hierarchies often do help categorize and sort information. Use your judgment to determine whether a grouping is worth the added complexity.
 

In the following sections, we'll provide illustrative descriptions of common status codes for better understanding. For the full list, review the [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) reference. Now, let's continue with the response descriptions that will help us craft precise and informative responses in the OpenAPI specification.

1. In the response object, provide a description.

   Some descriptions are reusable for all status codes.
   Other descriptions may depend on the specific operation.

   ```yaml
   responses:
     "200":
      description: A new user was created.
   ```

   Be as specific as is reasonable.
   Often, `200` statuses use only `OK` for the description, and that might be sufficient.

1. Define content type and schema.

   In the `content` object, describe the content type and the returned schema.
   Often the schema needs only to reference a structure described in the `components` object of your specification.

   REST APIs often return JSON content, `application/json`.
   But other formats, like `text/plain` or `img/png`, are common, too.

All together, a full `responses` object looks something like this:

```yaml
paths:
  /v1/user:
    post:
      operationId: createUserv1
      summary: Create user
      ###
      responses:
        "200":
          content:
            application/json:
              schema:
                ## Reuses the User object
                $ref: "#/components/schemas/User"
          description: OK
        "400":
          description: Bad request. User name must be a string.
        default:
          ## A default response for cases that are undescribed
          $ref: "#/components/responses/default"
```

> **Note:** Each response may also include response headers providing additional context about things like rate limits.

Status, description, and content: that's all you need to describe a response.
However, the best way to structure this content is highly contextually dependent.

The rest of this article recommends how you should describe this content for successful and unsuccessful requests.

## Make Success Feel Successful

Broadly, users make requests for two reasons:

- To get resources
- To create or modify the status of a resource

So, your success responses must tell the user what succeeded and provide the resources they requested.

### Give GETs Their Resources

Users typically expect GET requests to return some data.
The structure and content of the data depend entirely on the resources the application offers.
For specifics about how to describe this data, read our
[guide to data type formats](https://speakeasyapi.dev/post/openapi-tips-data-type-formats/).

However, no matter the specifics, the response to a GET is likely either:

- An object for a specifically requested item
- An array of these items

Many, if not most, of the items returned by a GET are composed of data structures that the API reuses in other requests and responses.
To keep your interface consistent and avoid tedious repetition, describe all reusable items in `components/schemas`.
Then reference the object in your response.

For example, a GET request to a `/users/{user_id}` probably returns a single user object:

```YAML
"200":
  content:
    application/json:
      schema:
        $ref: "#/components/schemas/User"
```

A GET request to just `/users` likely returns an array of these objects.
To describe this array, your schema might reference a `Users` schema that contains an array of `user` objects.
And for list operations like this, remember to paginate.
Large response bodies can become performance bottlenecks. Even if the listed objects are few at first, the number will grow with your user base.

In this schema, pagination is described by the `offset` property.

```yaml
users:
  description: A list of users to return.
  items:
    $ref: "#/components/schemas/User"
  type: array
offset:
  type: integer
  description: The page to return
  default: 1
```

### Define Payloads for Other Methods by Use Case

For other methods, like PUT and POST, the payloads are more variable.

For example, if a POST creates an object, users may find it convenient for the API to return the created object.
However, returning the full object may not always be useful or practical, especially when there are performance constraints to consider.
In these cases, it may be sufficient to return only the newly created ID with a link, or a link to its resource (refer to the `201` status described in the subsequent section).

Similar advice applies to PUT and PATCH requests.
If returning the object isn't necessary, your response might require only a description that informs the user of the new status.

```yaml
put:
  "200":
    description: User was updated.
```

> Besides, POST requests often do more than create, since the flexible syntax lends itself to custom operations.

### Going Beyond 200

`200` is the most common success status, but not the only one.
If appropriate, consider including the following codes as responses for some operations.

- `201`: Lets users know the resource is created. Returns a link instead of an object.
- `204`: Indicates an empty response body (and informs that an empty body is expected). Some APIs use the `204` status to indicate success for operations that don't require additional information or resources. For example, a successful DELETE request operates on resources that, by definition, no longer exist when its response is sent. A `204 No Content` can indicate that the resource was successfully deleted and that the empty body is part of the defined behavior.

## Return Errors That Inform and Help Recover

By definition, errors mean the API did not return a requested resource.
If a call returns an error, tell users what happened and how they can recover.

Your specification should describe all known responses to codify errors and suggest appropriate recovery.
For some errors, a status code and terse description provide enough information.
Other errors may require different bodies for different operations.

### Reuse Descriptions for Standard Errors

Some error statuses always have the same causes and the same response bodies.
For example, `429` errors always indicate that a rate limit was reached, and `418` errors always indicate that the user should [make a cup of tea](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418).

To minimize writing and to maintain message consistency for users,
define these responses in your `components/responses` object and reuse them across definitions.

Here's an example of a `responses` object whose properties all refer to reusable error bodies:

```yaml
responses:
  "401":
    $ref: "#/components/responses/401"
  "403":
    $ref: "#/components/responses/403"
  "404":
    $ref: "#/components/responses/404"
  "429":
    $ref: "#/components/responses/429"
```

The content for these errors is described in the `components` part of the specification:

```YAML
components:
  responses:
    "401":
      description: Unauthorized. The request did not have a valid API key.
    "403":
      description: Forbidden. This API key doesn't have necessary permissions.
    "404":
      description: Not Found. Server cannot find the requested resource.
    "429":
      description: Too Many Requests. The rate limit has been reached for this API key.
```

### Provide Details To Help Fix Bad Requests

Other status codes may need more than a generic message.
For example, requests that receive a `400 Bad request` status often have invalid fields.
For these cases, consider giving each relevant operation a unique `400` description that describes its necessary fields.

```YAML
/v1/user:
   post:
    summary: Create user
    responses:
      "400":
          description: Bad request. Operation requires valid `username` and `email` fields.
          content:
            schema:
                $ref: "#/components/schemas/FailedUserCreation"
```

A caveat for this recommendation is that the number of response bodies can be very large, especially if responses are dynamically generated based on field-validation errors.

It may be impractical to describe all error cases.
As a workaround, some specification authors write only a specific `description` (as in the preceding snippet), then refer to a generic `400` schema with placeholder values.

## Multi-Purpose Response Descriptions

When referencing a reusable component is insufficient, the OpenAPI Specification has a few features to make descriptions more flexible.
These features provide ways to join sets of schemas, define responses across a range of statuses, or provide default responses.

### Join Schemas With `allOf`

You might want to compose a response from separate schemas.
For example, a request for a resource about an administrative user might include the basic `user` object along with additional properties particular to administrators.
In this case, describe your schemas with the `allOf` operator, putting each schema as an item in an array.

```yaml
Admin:
  description: A user with admin privileges
  allOf:
  - $ref: '#/components/schemas/User'
  - type: object
    properties:
      super_admin:
        type: boolean
        description: Whether the user has super admin privileges
```

For another use of `allOf`, the API may have basic and extended error models, as given in the [example from the specification](https://spec.openapis.org/oas/latest.html#schemaObject).

### Select Schemas With `anyOf` and `oneOf`

These operators describe responses that might contain some combination of schemas.
Similar to `allOf`, these operators are defined in an array.

For example, a request to an endpoint called `/one-binary-number` might return one of two possible schemas:

```yaml
myBinarySymbol:
  oneOf:
  - $ref: '#/components/schemas/zero'
  - $ref: '#/components/schemas/one'
```

Alternatively, `anyOf` could return one or both of the preceding references.

### Status Ranges

Sometimes, a single response is enough for an entire numeric range of statuses.
For these times, use the `nXX` convention (where `n` is the number the status code starts with).

For example, you may want all 500 errors to return the same body:

```yaml
'5XX':
  description: This was our fault. Please wait a minute and try again.
```

> This `xx` description _does not_ override other defined responses for the same error class.
> So you could describe, for example, the `501` error explicitly, then use `5xx` as a catch-all for all other server-side errors.

### The Default Property

As this article has emphasized, specificity is generally preferred.
But a well-defined default can also be important.

For these times, the `responses` object also accepts a `default` property:

```yaml
paths:
  /health:
    get:
      responses:
        "200":
          description: OK
        default:
          ## reusable default
          $ref: "#/components/responses/default"

## default definition

components:
  responses:
    default:
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
      description: Default error response
```

## Conclusion

If you choose the design-first approach, the OpenAPI Specification provides a great authoring medium, with well-defined properties to structure well-defined data. It also has a robust ecosystem of tooling, which comes with its own benefits, as you can use the specification to create SDKs, contract test, mock servers, and so on.

But no matter how you write your API, the principles of design don't change. An API is as good as the value it returns. So, when you create an API, design its responses from the user's perspective.

## Further Reading

The following links are for canonical sources of information relevant to OpenAPI and HTTP responses.

- [MDN: HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [RFC 9110: HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html)  
- [The OpenAPI specification](https://spec.openapis.org/oas/latest.html)
