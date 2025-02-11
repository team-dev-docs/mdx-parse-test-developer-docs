---
title: "SDK Hooks: Safely add custom logic to your SDKs"
description: "Our code generation now supports the addition of custom logic to SDKs, allowing you to further customize your SDKs."
image: "/media/release-sdk-hooks.png"
date: 2024-04-04
authors:
  - name: Tristan Cartledge
  - image_url: '/media/author-headshots/tristan.jpeg'
tags:
  - Product Updates
featured_image: "/media/release-sdk-hooks.png"
is_featured: true
---

For those who live and breathe APIs, there’s a nuanced distinction between what is considered an SDK (Software Development Kit) and what is considered an HTTP Client. The difference lies in the level of abstraction that’s being provided on top of the API. HTTP clients offer a language-native, but unadorned way of sending requests over the internet. SDKs meanwhile are a superset of an HTTP Client, injecting additional functionality that lives outside of the API definition.  The line is fuzzy, but by the most pedantic definition, up to now Speakeasy has created (amazing) HTTP clients. 

However, with our newest feature – SDK Hooks, we’re stepping firmly into the territory of SDKs. Hooks provide SDK authors with a way to easily inject custom code that executes at specified events in the SDK’s runtime. This allows Speakeasy users to extend their SDKs to include business logic or additional transformations that lie outside of their API definition.

[Full documentation here](/docs/customize/code/sdk-hooks)

## How Does It Work?

In this intial release, we are exposing four event types (Hooks) where users are able to specify custom functionality:

- **SDK initialization** - at the time the end user instantiates their SDK.
- **Pre-request** - before a request is sent to the server.
- **Post-request success** - after a request has been successfully completed.
- **Post-request error** - after a request has resulted in an error.

![Diagram showing SDK hooks in the request stream](./assets/sdk-hooks.png)

To add custom code via a Hook you just need to add a new file to the `hooks` folder of your SDK that defines a hook class that implements a subset of the above four types:

```typescript
import {
  AfterSuccessContext,
  AfterSuccessHook,
  BeforeRequestContext,
  BeforeRequestHook,
} from "./types";

import { HTTPClient } from "../lib/http";

export class ExampleHook
  implements BeforeRequestHook, AfterSuccessHook
{
  beforeRequest(hookCtx: BeforeRequestContext, request: Request): Request {
    // modify the request object before it is sent, such as adding headers or query parameters or throw an error to stop the request from being sent
    return request;
  }

  afterSuccess(hookCtx: AfterSuccessContext, response: Response): Response {
    // modify the response object before deserialization or throw an error to stop the response from being deserialized
    return response;
  }
}
```

## What Can You Do With Hooks?

Anything you can think of! That’s what is so exciting about Hooks. Allowing for the addition of custom code in a safe, extensible manner means there’s no limit on what’s possible.

A few of the use cases that have us really excited right off the bat:

- **Custom authentication** - Inject code to handle a custom authentication mechanism that lives outside of what’s easily definable in OpenAPI.
- **Use a custom HTTP client** - Have your SDK make use of a custom HTTP client if you have non-standard networking requirements.
- **Add Logging** - Hook in your favorite telemetry provider to log data on what’s happening on the client side of your API integrations.
- **Handle Sensitive Data** - If you’re worried about sensitive information being erroneously sent, to your API, inject code to make sure certain fields are properly encrypted, or even write code to handle the encryption for your customers.
- **Add caching** Write code to build a local cache in which you can store commonly produced responses. Save users time, and spare your API the overhead.
- **Error handling** - Insert custom error handling into your SDK to help end users troubleshoot a broken integration. Maybe flagging that a particular endpoint has had recent breaking changes, and pointing them towards the docs.

The above are just a few of the examples of what’s possible. We can’t wait to see what other use cases people discover.

## **The Future**

We want to give our users the tools to make the richest SDKs possible. Looking ahead, we’re excited about the possibility of adding additional Hooks to make control as fine-grained as possible. If there are any additional hooks that you would like to see, please don’t hesitate to get in touch and let us know!