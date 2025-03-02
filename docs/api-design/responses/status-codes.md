# API Response Status Codes

This document outlines the standard HTTP status codes used in API responses.

## 2xx Success

200 OK - The request was successful
201 Created - A new resource was successfully created
204 No Content - The request was successful but there is no content to send back

## 3xx Redirection 

301 Moved Permanently - The requested resource has been permanently moved
304 Not Modified - The client's cached version is up to date

## 4xx Client Errors

400 Bad Request - The request was invalid or cannot be served
401 Unauthorized - Authentication is required and has failed or has not been provided
403 Forbidden - The request was valid, but the server is refusing action
404 Not Found - The requested resource could not be found

> Note: 4xx errors indicate that the error is on the client side. The request may need to be modified before retrying.

## 5xx Server Errors

500 Internal Server Error - A generic error message when an unexpected condition was encountered
502 Bad Gateway - The server received an invalid response from the upstream server
503 Service Unavailable - The server is currently unavailable (overloaded or down for maintenance)

> Note: 5xx errors indicate that the error is on the server side. The client may retry the request after some delay.

## Using Status Codes

When designing your API:

1. Use the appropriate status code for each response
2. Include a descriptive message in the response body for errors
3. Be consistent in your use of status codes across endpoints

Following these guidelines will help make your API more intuitive and easier to use for developers.