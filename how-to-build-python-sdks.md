# How to Build Python SDKs

This guide explains how to build Python SDKs for our APIs using our SDK generator tool.

## Prerequisites

- Python 3.7+
- pip
- virtualenv (recommended)

## Steps

1. Clone the SDK generator repository:

   ```
   git clone https://github.com/our-company/sdk-generator.git
   cd sdk-generator
   ```

2. Set up a virtual environment (optional but recommended):

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Run the SDK generator:

   ```
   python generate_sdk.py --api-name <API_NAME> --version <API_VERSION>
   ```

   Replace `<API_NAME>` with the name of the API you want to build an SDK for, and `<API_VERSION>` with the desired version.

5. The generated SDK will be in the `output` directory. You can now use this SDK in your Python projects.

## Usage Example

Here's a basic example of how to use the generated SDK:

```python
from our_company_sdk import ApiClient

client = ApiClient(api_key="your_api_key_here")
response = client.some_endpoint(param1="value1", param2="value2")
print(response)
```

## Troubleshooting

If you encounter any issues:

1. Make sure you have the latest version of the SDK generator.
2. Check that your API key is correct and has the necessary permissions.
3. Verify that you're using a supported Python version.

For more help, please contact our support team at support@our-company.com.