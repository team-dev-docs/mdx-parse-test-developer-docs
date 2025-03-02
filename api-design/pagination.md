# Pagination

Imagine you have millions of blog posts in your database. It would be impractical and inefficient to return all of them in a single API response. This is where pagination comes in handy.

Pagination allows you to divide large sets of data into smaller, more manageable chunks. This approach offers several benefits:

1. Improved performance
2. Reduced server load
3. Better user experience
4. Easier data handling on the client side

## Common Pagination Approaches

### Offset-based Pagination

Offset-based pagination uses `limit` and `offset` parameters to paginate through results.

```
GET /api/posts?limit=10&offset=0
```

Pros:
- Simple to implement
- Works well with SQL databases

Cons:
- Performance issues with large offsets
- Inconsistent results if items are added or removed between requests

### Cursor-based Pagination

Cursor-based pagination uses a pointer (cursor) to keep track of where in the dataset the next items should be fetched from.

```
GET /api/posts?limit=10&cursor=eyJpZCI6MTAwfQ==
```

Pros:
- Consistent results even when items are added or removed
- Better performance for large datasets

Cons:
- More complex to implement
- May require additional indexing

### Page-based Pagination

Page-based pagination divides the dataset into pages and allows clients to request specific pages.

```
GET /api/posts?page=1&per_page=10
```

Pros:
- Simple to understand and implement
- Works well for displaying numbered pages in UIs

Cons:
- Can be inefficient for large datasets
- May return inconsistent results if items are added or removed

## Best Practices

1. Use cursor-based pagination for large, frequently updated datasets
2. Include pagination information in the response metadata
3. Set reasonable default and maximum values for `limit` parameters
4. Use consistent naming conventions for pagination parameters
5. Implement proper error handling for invalid pagination requests

## Example Response

```json
{
  "data": [
    { "id": 1, "title": "First Post" },
    { "id": 2, "title": "Second Post" },
    // ...
  ],
  "pagination": {
    "total_items": 1000,
    "total_pages": 100,
    "current_page": 1,
    "per_page": 10,
    "next_cursor": "eyJpZCI6MTB9"
  }
}
```

## Further Reading

- [Cloudflare API Pagination](https://api.cloudflare.com/#getting-started-pagination)
- [GitHub API Pagination](https://docs.github.com/en/rest/guides/traversing-with-pagination)
- [Google API Design Guide - Pagination](https://cloud.google.com/apis/design/design_patterns#list_pagination)