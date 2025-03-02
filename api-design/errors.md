# Error Handling

This document outlines best practices for handling errors in our API.

## HTTP Status Codes

Use appropriate HTTP status codes to indicate the nature of the error:

- 2xx: Success
- 4xx: Client errors
- 5xx: Server errors

## Error Response Format

Error responses should follow this structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "A human-readable error message",
    "details": {}
  }
}
```

> **Note:** The `details` field is optional and can contain additional information about the error.

## Common Error Codes

| Code | Description |
|------|-------------|
| INVALID_REQUEST | The request was malformed or contained invalid parameters |
| UNAUTHORIZED | The request lacks valid authentication credentials |
| FORBIDDEN | The request is not allowed |
| NOT_FOUND | The requested resource does not exist |
| INTERNAL_ERROR | An unexpected error occurred on the server |

## Logging

All errors should be logged with appropriate severity levels:

- 4xx errors: WARNING
- 5xx errors: ERROR

Include relevant request information in the logs to aid debugging.

## Client-Side Handling

Clients should be prepared to handle various HTTP status codes and error responses. They should provide meaningful feedback to the end-user based on the error information received from the API.