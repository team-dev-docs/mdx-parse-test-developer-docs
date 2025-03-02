# APIs vs SDKs

When integrating with the Anthropic API, you have two main options:

1. Call the HTTP API directly
2. Use an official Anthropic SDK

## Calling the API Directly

You can make HTTP requests directly to our API endpoints from any programming language. This gives you the most flexibility but requires you to handle things like authentication, request formatting, and error handling yourself.

Pros:
- Works from any language/environment
- Most flexible
- Lightweight

Cons:  
- More work to implement
- Have to handle lower-level details yourself

## Using an SDK

We offer official SDKs for popular languages that wrap the API in a more convenient interface. The SDKs handle authentication, formatting, and other details for you.

Pros:
- Easier to use
- Handles many details for you
- Language-specific features

Cons:
- Only available for certain languages
- Adds a dependency to your project

## Recommendation

We generally recommend using an official SDK when one is available for your language. This provides the easiest integration experience. However, calling the API directly is a good option if you need maximum flexibility or are using a language without an SDK.