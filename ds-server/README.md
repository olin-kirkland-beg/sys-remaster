# ds-server

This project is a TypeScript REST API server that provides user authentication and management functionalities. It includes a login route and CRUD operations for managing users.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ds-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the server:
   ```
   npm start
   ```

## API Usage

### Login

- **Endpoint:** `POST /login`
- **Description:** Authenticates a user and returns a token.

### User Management

- **Create User:**
  - **Endpoint:** `POST /users`
  - **Description:** Creates a new user.

- **Get User:**
  - **Endpoint:** `GET /users/:id`
  - **Description:** Retrieves user details by ID.

- **Update User:**
  - **Endpoint:** `PUT /users/:id`
  - **Description:** Updates user details by ID.

- **Delete User:**
  - **Endpoint:** `DELETE /users/:id`
  - **Description:** Deletes a user by ID.