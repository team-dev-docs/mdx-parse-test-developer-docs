# File Uploads

This document outlines best practices for implementing file uploads in our API.

## Multipart Form Data

For most file upload scenarios, use multipart/form-data as the content type. This allows for efficient uploading of files along with other form fields.

Example:

```http
POST /upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="example.jpg"
Content-Type: image/jpeg

(binary data)
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="description"

This is an example image
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

## Chunked Uploads

For large files or scenarios with potentially intermittent network connections, implement chunked uploads:

1. Initiate upload and get an upload ID
2. Upload chunks with progress tracking
3. Finalize upload

Example endpoints:

- `POST /uploads/initiate`
- `PUT /uploads/{uploadId}/chunks/{chunkNumber}`
- `POST /uploads/{uploadId}/complete`

## Security Considerations

- Implement file type validation
- Set maximum file size limits
- Scan uploaded files for malware
- Use HTTPS for all file transfer operations

## Error Handling

Provide clear error messages for common issues:

- File too large
- Invalid file type
- Upload interrupted
- Server-side processing errors

## Client-side Considerations

When building client applications:

- Show progress indicators for uploads
- Allow cancellation of in-progress uploads
- Implement retry logic for failed chunks in chunked uploads

## API Responses

Return useful metadata after successful uploads:

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "filename": "example.jpg",
  "size": 1048576,
  "mimeType": "image/jpeg",
  "url": "https://example.com/files/f47ac10b-58cc-4372-a567-0e02b2c3d479"
}
```

Remember to handle CORS appropriately if your API needs to accept uploads from web browsers on different domains.