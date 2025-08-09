# Store Rating & Review Platform

This is a full-stack web application that allows users to register, find stores, and submit ratings. The application features a role-based access control system for three types of users: System Administrators, Store Owners, and Normal Users.

## Features

### 👤 User Roles & Permissions

* **System Administrator**:
    * Manages the entire platform.
    * Can add new stores, users (of any role), and other administrators.
    * Views a dashboard with platform-wide statistics (total users, stores, ratings).
    * Can view, filter, and sort lists of all users and stores.

* **Normal User**:
    * Can sign up and log in to the platform.
    * Can view a list of all registered stores with their overall ratings.
    * Can search for stores by name and address.
    * Can submit a rating (from 1 to 5) for any store.
    * Can modify their own submitted ratings.
    * Can update their own password.

* **Store Owner**:
    * Can log in to the platform.
    * Views a dashboard showing the average rating for their store.
    * Can see a list of all users who have submitted ratings for their store.
    * Can update their own password.

### ⚙️ Technical Features

* **Backend**: Secure RESTful API built with Node.js and Express.js.
* **Authentication**: JWT (JSON Web Tokens) for secure, stateless authentication.
* **Database**: PostgreSQL for robust and reliable data storage.
* **Frontend**: A responsive and interactive user interface built with React.js.
* **Form Validations**: Strict validation rules for all user inputs on both client and server sides.

## Tech Stack

* **Frontend**: React.js, React Router, Axios
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **Authentication**: JWT, bcrypt.js

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/en/) (v14 or later)
* [npm](https://www.npmjs.com/) (comes with Node.js)
* [PostgreSQL](https://www.postgresql.org/download/)

---

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/hasaniisaher21/store_rating_app.git
cd store-rating-app
```

### 2. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create the environment file:**
    Create a file named `.env` in the `backend` directory and add the following content. **Replace the placeholder values with your actual PostgreSQL credentials.**

    ```env
    # PostgreSQL Database Configuration
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=store_rating_app_db
    DB_PASSWORD="iShasan#21"
    DB_PORT=5432

    # JWT Secret Key
    JWT_SECRET=storeratingappassignment
    ```

4.  **Set up the PostgreSQL Database:**
    * Open `psql` or your preferred PostgreSQL client.
    * Create the database:
        ```sql
        CREATE DATABASE store_rating_app_db;
        ```
    * Connect to the new database and run the following SQL commands to create the tables:
        ```sql
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(60) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            address VARCHAR(400),
            role VARCHAR(20) NOT NULL DEFAULT 'Normal User'
        );

        CREATE TABLE stores (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(400) NOT NULL,
            owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL
        );

        CREATE TABLE ratings (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
            rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, store_id)
        );
        ```

5.  **Start the backend server:**
    ```bash
    npm start
    ```
    The API will be running on `http://localhost:5000`.

### 3. Frontend Setup

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the React development server:**
    ```bash
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

---

## API Endpoints

A collection of API endpoints is available for interacting with the application.

* `POST /api/auth/signup` - Register a new user.
* `POST /api/auth/login` - Log in a user and get a JWT.
* `GET /api/stores` - Get a list of all stores.
* `POST /api/stores` - (Admin) Add a new store.
* `POST /api/stores/:id/ratings` - (Normal User) Add or update a rating for a store.
* `GET /api/admin/dashboard` - (Admin) Get dashboard statistics.
* `GET /api/owner/dashboard` - (Store Owner) Get dashboard statistics.
