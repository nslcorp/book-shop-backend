// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "book-shop-product-service",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      },
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get./products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {
    "Book": {
      "properties": {
        "id": {
          "$ref": "#/definitions/String",
          "title": "Book.id"
        },
        "author": {
          "$ref": "#/definitions/String",
          "title": "Book.author"
        },
        "title": {
          "$ref": "#/definitions/String",
          "title": "Book.title"
        },
        "description": {
          "$ref": "#/definitions/String",
          "title": "Book.description"
        },
        "price": {
          "title": "Book.price",
          "type": "number"
        },
        "genre": {
          "$ref": "#/definitions/String",
          "title": "Book.genre"
        },
        "img": {
          "$ref": "#/definitions/String",
          "title": "Book.img"
        }
      },
      "required": [
        "id",
        "author",
        "title",
        "description",
        "price",
        "genre",
        "img"
      ],
      "additionalProperties": false,
      "title": "Book",
      "type": "object"
    }
  },
  "securityDefinitions": {},
  "basePath": "/dev",
  "host": "6obctl4bmf.execute-api.eu-central-1.amazonaws.com"
};