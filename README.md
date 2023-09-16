# Shoe Catalogue API

[![Node.js CI](https://github.com/mokhelek/shoe-catalogue-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/mokhelek/shoe-catalogue-api/actions/workflows/node.js.yml)

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

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/mokhelek/shoe-catalogue-api.git

2. Navigate into the project's folder

   ```bash
   cd shoe-catalogue-api

3. Install dependencies

   ```bash
   npm install

4. Run the server

   ```bash
   npm start

## Technologies

* Langauge: Javascript
* Framework: Express.js
* Runtime: Node
* Database: PostgreSQL
* Testing: Mocha
* Development Methodology: TDD (Test Driven Development)
  
