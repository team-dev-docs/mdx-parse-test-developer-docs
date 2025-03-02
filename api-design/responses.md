# API Response Design

When designing API responses, it's important to consider:

- Consistency across endpoints
- Including appropriate status codes
- Providing clear error messages
- Structuring data for easy consumption

## Response Format

We use a standard JSON response format:

```json
{
  "data": {
    // Response payload
  },
  "meta": {
    // Metadata about the response
  },
  "errors": [
    // Array of error objects if applicable
  ]
}
```

### Success Responses

For successful requests, include relevant data in the `data` field and any metadata in the `meta` field. The `errors` array should be omitted.

### Error Responses

For errors, include details in the `errors` array and omit the `data` field. Each error object should have:

- `code`: A unique error code
- `message`: A human-readable error message
- `detail`: Additional error details (optional)

## HTTP Status Codes

Use appropriate HTTP status codes:

- 2xx for successful requests
- 4xx for client errors
- 5xx for server errors

Common status codes:

| Code | Meaning               |
|------|----------------------|
| 200  | OK                   |
| 201  | Created              |
| 400  | Bad Request          |
| 401  | Unauthorized         |
| 403  | Forbidden            |
| 404  | Not Found            |
| 500  | Internal Server Error |

## Pagination

For endpoints that return lists, use cursor-based pagination:

```json
{
  "data": [...],
  "meta": {
    "cursor": "next_page_cursor",
    "has_more": true
  }
}
```

## Versioning

Include the API version in the response headers:

```
X-API-Version: 1.0
```

## Examples

### Successful Response

```json
{
  "data": {
    "id": "123",
    "name": "Example Item"
  },
  "meta": {
    "request_id": "abc-123"
  }
}
```

### Error Response

```json
{
  "errors": [
    {
      "code": "INVALID_PARAMETER",
      "message": "The provided parameter is invalid",
      "detail": "Name must be at least 3 characters long"
    }
  ]
}
```