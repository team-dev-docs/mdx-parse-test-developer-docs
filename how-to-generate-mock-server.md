# How to Generate a Mock Server

This guide will walk you through the process of generating a mock server using the OpenAPI specification.

## Prerequisites

Before you begin, make sure you have the following:

- Node.js installed on your machine
- An OpenAPI specification file (YAML or JSON format)

## Steps

1. **Install Prism CLI**

   Open your terminal and run the following command to install Prism CLI globally:

   ```
   npm install -g @stoplight/prism-cli
   ```

2. **Start the Mock Server**

   Navigate to the directory containing your OpenAPI specification file and run:

   ```
   prism mock path/to/your/openapi-spec.yaml
   ```

   Replace `path/to/your/openapi-spec.yaml` with the actual path to your OpenAPI specification file.

3. **Access the Mock Server**

   Once the server starts, you'll see output similar to:

   ```
   [4:32:40 PM] › [CLI] …  awaiting  Starting Prism…
   [4:32:41 PM] › [CLI] ℹ  info      Server listening at http://127.0.0.1:4010
   ```

   You can now send requests to `http://127.0.0.1:4010` (or the URL provided in the output).

## Example Usage

Here's an example of how to use the mock server:

```
curl http://127.0.0.1:4010/api/users
```

This will return a mock response based on the `/api/users` endpoint defined in your OpenAPI specification.

## Advanced Configuration

For more advanced configuration options, refer to the [Prism documentation](https://meta.stoplight.io/docs/prism/docs/getting-started/01-installation.md).

## Troubleshooting

If you encounter any issues:

1. Ensure your OpenAPI specification is valid
2. Check that the file path is correct
3. Verify that the required ports are not in use by other applications

For further assistance, consult the [Prism GitHub repository](https://github.com/stoplightio/prism) or open an issue there.