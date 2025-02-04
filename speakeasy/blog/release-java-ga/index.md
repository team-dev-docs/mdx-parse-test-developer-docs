---
title: "Generally Available: Java"
description: "Our Java generation is now generally available. That means all SDK features are available with an enhanced developer experience."
image: "/media/release-java-ga.png"
date: 2024-03-19
authors:
  - name: Nolan Sullivan
  - image_url: '/media/author-headshots/nolan.jpeg'
tags:
  - Product Updates
featured_image: "/media/release-java-ga.png"
is_featured: true
---

Today, our Java generation is generally available! Every SDK feature we offer is now available to users generating Java libraries. In addition to the slew of new features, we've invested significantly in  enhancing the usability, readability, and overall developer experience of the library code.

Before going any further, here are the headline features that come with the new Java SDKs generated using Speakeasy:

- Enhanced `null` safety and `Optional` support
- Builder patterns for better readability, discoverability, and convenient overloads
- Lists instead of arrays for collections
- No direct field access (getter methods are used now)
- A simplified Gradle project structure
- Support for non-discriminated `oneOf`s
- Auto-Pagination
- Retry support
- Oauth2 support

To get started, all you need is an OpenAPI spec. Simply install the speakeasy CLI, and start generating:

```bash
brew install speakeasy-api/homebrew-tap/speakeasy
```

```bash
speakeasy quickstart
```

## Enhanced Null Safety and Optional Support

We've improved compile-time type safety by adding native support for null fields (using `JSONNullable`) and optional fields (using `java.util.Optional`). More explicit handling of fields allows your users to write robust and error-resistant code.

## Builder Patterns for Better Readability

A major focus of the general availability work was enhancing the readability of the code. That includes everything from whitespacing to formatting, to the directory structure. But one of the most noticeable changes is the introduction of builder patterns which allow for more fluent and intuitive object creation and request preparation. That makes your users' code easier to write, read, and maintain.

```java
Person person = new Person.Builder()
    .name("John Doe")
    .age(30)
    .build();
```

## Lists over Arrays for Collections

Recognizing the limitations of arrays in dynamic contexts, our Java generation now makes use of `java.util.List`, which offers a more intuitive interface for users working with collections.

## OneOf Support

Our Java generation now handles more complex APIs by offering support for `oneOf`. This allows for the generation of polymorphic types in the SDK.

```java
Pet pet = ...; // might be returned from an SDK call
if (pet.value() instanceof Cat cat) {
   // do something with the cat
} else if (pet.value() instanceof Dog dog) {
   // do something with the dog
} else {
   throw new RuntimeException("unexpected value");
}
```

## Auto-Pagination

To further ease the processing of large responses, the new Java generation incorporates auto-pagination by creating a `callAsStream()` method which returns a `java.util.Stream`.

```java
SDK sdk = SDK.builder() ... ;

sdk.searchDocuments()    // builder for the request
   .contains("simple")   // parameter
   .minSize(200)         // parameter
   .maxSize(400)         // parameter
   .callAsStream()       // returns Stream<DocumentsPageResponse>
   .flatMap(x -> x.res() // returns Optional<DocumentsPage>
                  .stream()
                  .flatMap(y -> y.documents().stream()))
   // we are now dealing with a Stream<Document>
   .filter(document -> "fiction".equals(document.category()))
   .limit(200) // no more than 200 documents
   .map(document -> document.name())
   .forEach(System.out::println);
```

## OAuth2 Support

We now offer native support for an OAuth2 Client Credentials flow where the credentials  are passed in the request body of the `tokenUrl` request. We will generate an SDK with a security instantiation as follows:

```java
SDK s = SDK.builder().security(
  Security.builder()
      .clientId("..CLIENT_ID..")
      .clientSecret("..CLIENT_SECRET..")
      .build())
  .build();
```

## Retry Support

Retries can be easily enabled to handle transient errors using an easily customizable backoff strategy.

```yaml
x-speakeasy-retries:
  strategy: backoff
  backoff:
    initialInterval: 500        # 500 milliseconds
    maxInterval: 60000          # 60 seconds
    maxElapsedTime: 3600000     # 5 minutes
    exponent: 1.5
  statusCodes:
    - 5XX
  retryConnectionErrors: true
```

## Refined Gradle Experience

Improvements to the Gradle build configuration and project structure aim to simplify dependency management and streamline the build process, enhancing the development workflow.

## Building on good foundations

We're really excited to provide users with an awesome experience using generated SDKs. There's often a trade-off that product engineers and API owners consider when relying on code generators versus hand-building SDKs and the quality of the code and public interface they produce. We believe that our refreshed Java generator has baked in a lot of good ideas that ultimately result in a great developer experience, one that feels like working with a carefully curated Java SDK. We now have the foundation to build even more exciting features like support for Server-sent Events and we're looking forward to taking more of the pain away from shipping awesome DX for your products.

If you do try out Speakeasy and our Java SDKs, we'd love to get your feedback about your experience, as well as hear any new ideas or feature requests you have.

Happy hacking!
