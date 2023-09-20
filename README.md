# RESTful API Documentation

This document provides information about the RESTful API for managing records.

## Table of Contents

- Endpoints
  - GET /records
  - GET /records/:id
  - DELETE /records/:id
  - POST /records
  - PATCH /records/:id
- Usage
- Authentication
- Error Handling
- Sample Requests and Responses

## Endpoints

## GET /records

Retrieve a list of all records.

#### Request:

```http
GET /records
```

#### Response:

🟢

```json
Status: 200 OK
Content-Type: application/json

{
  records:[
    {
      "_id": "id_1",
      "artist": "Artist Name 1",
      "cover": "https://www.example.com/artist1.webp",
      "description": "Description 1",
      "genres": "Genres 1",
      "label": "Label 1",
      "length": "Length 1",
      "rating": 1,
      "record": "Record Name 1",
      "releaseDate": 2004,
      "user": "user id"
    },
    {
      "_id": "id_2",
      "artist": "Artist Name 2",
      "cover": "https://www.example.com/artist2.webp",
      "description": "Description 2",
      "genres": "Genres 2",
      "label": "Label 2",
      "length": "Length 2",
      "rating": 2,
      "record": "Record Name 2",
      "releaseDate": 2004,
      "user": "user id 2"
    },
  // ... more records
  ]
}
```

🔴

```json
Status: 404
{message: "Can't retrieve records"}
```

### GET /records/:id

Retrieve a specific record by its ID.

#### Request:

```json
GET /records/:id
```

#### Response:

🟢

```json
Status: 200 OK
Content-Type: application/json

{
  record:
  {
    "_id": "id_1",
    "artist": "Artist Name 1",
    "cover": "https://www.example.com/artist1.webp",
    "description": "Description 1",
    "genres": "Genres 1",
    "label": "Label 1",
    "length": "Length 1",
    "rating": 1,
    "record": "Record Name 1",
    "releaseDate": 2004,
    "user": "user id"
  }
}
```

🔴

```json
Status: 404
{error: "Can't retrieve records"}
```

### DELETE /records/:id

Delete a specific record by its ID.

#### Request:

```http
DELETE /records/:id
```

#### Response:

🟢

```json
Status: 200
{ message: "Record deleted successfully" }
```

🔴

```json
Status: 500
{error: "Failed to delete record"}
```

### POST /records

Create a new record.

#### Request:

```http
POST /records
Content-Type: application/json

{
  "artist": "Artist Name 1",
  "cover": "https://www.example.com/artist1.webp",
  "description": "Description 1",
  "genres": "Genres 1",
  "label": "Label 1",
  "length": "Length 1",
  "rating": 1,
  "record": "Record Name 1",
  "releaseDate": 2004,
}
```

#### Response:

🟢

```json
Status: 201 Created
Content-Type: application/json

{
  record:
  {
    "_id": "id_1",
    "artist": "Artist Name 1",
    "cover": "https://www.example.com/artist1.webp",
    "description": "Description 1",
    "genres": "Genres 1",
    "label": "Label 1",
    "length": "Length 1",
    "rating": 1,
    "record": "Record Name 1",
    "releaseDate": 2004,
    "user": "user id"
  }
}
```

🔴

```json
Status: 404
{message: "Can't create the record"}
```

### PATCH /records/:id

Update a specific record by its ID.

### Request:

```http
PATCH /records/:id
Content-Type: application/json

{
  "rating": 6
}
```

### Response:

🟢

```json
Status: 200 OK
Content-Type: application/json

{
  record:
  {
    "_id": "id_1",
    "artist": "Artist Name 1",
    "cover": "https://www.example.com/artist1.webp",
    "description": "Description 1",
    "genres": "Genres 1",
    "label": "Label 1",
    "length": "Length 1",
    "rating": 6,
    "record": "Record Name 1",
    "releaseDate": 2004,
    "user": "user id"
  }
}
```

🔴

```json
Status: 304
{error: "Failed to modify record"}
```

## Usage

To use this API, make HTTP requests to the specified endpoints using appropriate HTTP methods (GET, POST, DELETE, PATCH) as described above.

## Authentication

To access the API, users must have a GitHub account. Firebase Authentication provides a convenient method for GitHub-based login.

1. Firebase Authentication.
2. Authentication Token (GitHub Account)
3. Including the Token / Token verification

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of errors. Refer to each endpoint's documentation for details on possible error responses.

## Sample Requests and Responses

You can find sample HTTP requests and responses in the documentation for each endpoint above.

## MongoDB and Express.js Stack

MongoDB as a NoSQL database, storing the data in a document-based format.
Express.js as a framework for node.js to organize routers, middlewares, https methods and integrate the database system with MongoDB.

## Testing

In this API i used Jest for unit testing and Supertest for integration endpoint testing.
