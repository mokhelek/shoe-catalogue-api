# Shoe Catalogue API

Welcome to the Shoe Catalogue API documentation. This API allows you to manage and retrieve information about shoes, including their brand, size, color, price, and quantity.

## Endpoints

* `GET /` - Gets all routes
* `GET /api/shoes` - Gets all shoes
* `GET /api/shoes/brand/<brand>` - Filters by brand
* `GET /api/shoes/color/<color>` - Filters by color
* `GET /api/shoes/size/<size>` - Filters by size
* `GET /api/shoes/brand/<brand>/size/<size>` - Filters by brand and size
* `GET /api/shoes/size/<size>/color/<color>` - Filters by size and color
* `GET /api/shoes/brand/<brand>/color/<color>` - Filters by brand and color
* `GET /api/shoes/brand/<brand>/size/<size>/color/<color>` - Filters by brand, size and color
* `POST /api/shoes` - Adds new shoes
* `POST /api/shoes/sold/<shoe_id>` - Updates stock level

## Technologies

* Express.js
* PostgreSQL
