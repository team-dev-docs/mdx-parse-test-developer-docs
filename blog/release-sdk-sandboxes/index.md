---
title: "One-Click SDK Testing & Experimentation with SDK Sandboxes"
description: "Speakeasy released SDK Sandboxes to enable fast and easy SDK experimentation and testing in GitHub."
keywords: [api, sdk, sdk sandbox, developer containers]
date: 2023-10-11
image: "/media/release-sdk-sandbox.png"
authors:
  - name: Ryan Albert
  - image_url: "/media/author-headshots/ryan.png"
tags:
  - Product Updates
featured_image: "/media/release-sdk-sandbox.png"
is_featured: true
---

TL;DR: Speakeasy [SDK Sandboxes](/docs/advanced-setup/sdk-sandbox) enable you and your SDK end-users to easily test and experiment with your SDKs with a single click in GitHub - no more wrestling with new language setups or juggling endless dependencies. Get hands-on with the SDK in seconds.

As an API producer looking to offer a great developer experience for your end-users, you’ve recognized that SDKs are a key part of delivering on that promise. A critical step in building and [publishing your SDK](/post/apis-vs-sdks-difference) is testing that it works as advertised. Unless, of course, you're a maverick who deploys a new feature 2 minutes prior to a live demo to investors, in which case you’d probably skip all testing anyway! #yolo

Assuming that’s not you, before you can test the SDK, you first need to set up a development environment for each SDK language you want to test. For example, you may need to set up a Java environment, then a C# environment, then a PHP environment, then… If you’ve managed to navigate thus far, you still need to set up a test project, download or import the SDK, and manually make your SDK calls.

You may also want to give your SDK consumers a rapid way to explore and test the SDK — one that doesn’t require them to import the SDK, create toy projects, or worry about dependency clashes, configuration quirks, or setting up specific environments. Achieving this can help boost your time to 200 by giving consumers a no-risk, friction-free way to try your SDK.

## Enter Speakeasy SDK Sandboxes

Speakeasy SDK Sandboxes automatically set up language-specific environments for your SDKs with just a few lines of config. This creates a sandbox where you or your SDK consumers can jump straight into exploring the SDK, without the overhead of creating new dev setups or risking disruptions in their existing development environment. It's a ready-to-go test kit where all the pieces are pre-arranged, allowing users to focus solely on the SDK's capabilities.

Speakeasy’s SDK Sandboxes also provide an in-browser IDE that includes the Speakeasy CLI. With the CLI, you or your SDK users can immediately [generate SDK usage examples](/docs/code-samples/generate-code-samples) for any method without needing to hunt through docs — making for a powerful exploration experience.

Under the hood, our dev container product integrates effortlessly with a wide range of platforms, including GitHub's in-browser container solution, Codespaces.

## How It Works

To enable SDK Sandboxes in your Speakeasy SDK, just add a few lines of configuration to your project:

```yaml
configVersion: 1.0.0
generation:
  devContainers:
    enabled: true
    schemaPath: ./openapi.yaml
```

On the next generation run, Speakeasy will automatically generate support documentation and an SDK Sandboxes badge in your SDK README.

![A new SDK Sandboxes badge](./img/sdk-sandboxes-badge.png)

Once Speakeasy SDK Sandboxes are enabled, the SDK will show a new SDK Sandboxes badge.

Then, any user viewing the repo can just click the handy “Open in GitHub Codespace” badge to open the in-browser code editor and get started!

We also create custom SDK Sandboxes documentation that shows how to work with SDK usage snippets in your dev container environment, as well as how to generate additional usage snippets for any operation via the integrated Speakeasy CLI.

>✅ We currently offer SDK Sandbox support for `Go`, `Typescript`, and `Python`. [Please reach out for additional language requests](https://join.slack.com/t/speakeasy-dev/shared_invite).

## Skip Setup and Jump to Friction-Free DevEx

Speakeasy SDK Sandboxes offer both you and your SDK consumers a no-effort sandbox environment where you can validate the behavior of your SDK, and your customers can quickly explore its full capabilities. Instantly initialize a sandbox in[Github Codespaces](https://docs.github.com/en/codespaces/overview)with just a click, from any browser, whether you are in the office, on an airplane, or sitting on the beach!

Ready to try it for yourself? [Sign up](https://app.speakeasy.com/) for free today and head over to the[SDK Sandboxes docs](/docs/advanced-setup/sdk-sandbox) to add it to your SDK today.
