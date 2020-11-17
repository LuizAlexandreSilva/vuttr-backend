# Very Useful Tools to Remember(VUTTR)

This is a backend application to manage tools using name, link, description and tags.

## Tools

 - Node.js (express)
 - Typescript
 - PostgreSQL
 - Typeorm
 - Docker

## Features

 - List all tools
 - Add new tool (title, link, description, tags)
 - Remove a tool
 - Search tools by title/tags or by tags only
 
## Routes
```
GET /tools
```
Supported query params:

| Param       | Type     | Required | Description           |
|:------------|:---------|:---------|:----------------------|
| `tag`       | string   | no       | Tag or tool name.     |
| `tagsOnly`  | boolean  | no       | Search by tags only.  |


```
POST /tools
```
Supported body attributes:

| Attribute     | Type     | Required | Description                     |
|:--------------|:---------|:---------|:--------------------------------|
| `title`       | string   | yes      | Tool name.                      |
| `link`        | string   | yes      | Tool url link.                  |
| `description` | string   | no       | Tool description.               |
| `tags`        | string   | yes      | Tags separated by blank space.  |


```
DELETE /tools:id
```
Supported params:

| Attribute   | Type     | Required | Description           |
|:------------|:---------|:---------|:----------------------|
| `id`        | number   | yes      | Tool id attribute.    |


## Dependencies

 - Yarn v1.21.1 or higher
 - Docker version 19.03.12 or higher
 - docker-compose version 1.26.2 or higher

## Installing & running

Install dependencies:
```
yarn 
```

Create a .env file at root based on .env.example and initialize environment variables:
```
DB_USER=
DB_PASSWORD=
DB_NAME=vuttr
DB_HOST=
DB_PORT=
```

Run docker-compose to start database service: 
```
docker-compose up -d
```

Run migrations to create database tables:
```
yarn typeorm migration:run
```

Run application (it will launch at http://localhost:3333):
```
yarn start
```
