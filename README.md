# API Documentation for User Authentication and Cart Management

## Base URL

http://localhost:3000


## Authentication Endpoints

### 1. User Signup
- *Endpoint:* POST /api/auth/signup
- *Description:* Register a new user
- *Request Body:*
json
{
    "username": "john_doe",
    "password": "password123"
}

- *Success Response (201):*
json
{
    "username": "john_doe",
    "message": "User registered successfully"
}


### 2. User Login
- *Endpoint:* POST /api/auth/login
- *Description:* Login with existing credentials
- *Request Body:*
json
{
    "username": "john_doe",
    "password": "password123"
}

- *Success Response (200):*
json
{
    "username": "john_doe",
    "message": "Login successful"
}


## Cart Management Endpoints

### 1. Add Item to Cart
- *Endpoint:* POST /api/cart/add
- *Description:* Add a new item to user's cart
- *Request Body:*
json
{
    "username": "john_doe",
    "item": {
        "productName": "Laptop",
        "quantity": 1,
        "price": 999.99
    }
}

- *Success Response (201):*
json
{
    "username": "john_doe",
    "items": [
        {
            "productName": "Laptop",
            "quantity": 1,
            "price": 999.99,
            "_id": "507f1f77bcf86cd799439011"
        }
    ]
}


### 2. Get Cart Items
- *Endpoint:* GET /api/cart/:username
- *Description:* Retrieve all items in user's cart
- *URL Parameters:* username (string)
- *Success Response (200):*
json
{
    "username": "john_doe",
    "items": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "productName": "Laptop",
            "quantity": 1,
            "price": 999.99
        }
    ]
}


### 3. Update Cart Item
- *Endpoint:* PUT /api/cart/item/:username/:itemId
- *Description:* Update specific item in user's cart
- *URL Parameters:*
  - username (string)
  - itemId (string)
- *Request Body:*
json
{
    "quantity": 2,
    "price": 899.99
}

- *Success Response (200):*
json
{
    "username": "john_doe",
    "items": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "productName": "Laptop",
            "quantity": 2,
            "price": 899.99
        }
    ]
}


### 4. Delete Cart Item
- *Endpoint:* DELETE /api/cart/item/:username/:itemId
- *Description:* Remove specific item from user's cart
- *URL Parameters:*
  - username (string)
  - itemId (string)
- *Success Response (200):*
json
{
    "username": "john_doe",
    "items": []
}


## Error Responses

All endpoints may return the following error responses:

### 404 Not Found
json
{
    "message": "Cart not found"
}

or
json
{
    "message": "Item not found in cart"
}


### 500 Internal Server Error
json
{
    "message": "Error message details"
}


## Testing Instructions

1. Start the server using npm run dev
2. Import the endpoints into Postman
3. Set the base URL to http://localhost:3000
4. Test the endpoints in the following recommended order:
   - Create a user (signup)
   - Login with the created user
   - Add items to the cart
   - Retrieve cart items
   - Update cart items
   - Delete cart items
