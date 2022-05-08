# User management system

### Setup the MySQL database and table(s) before starting

```bash
cd user-management-system
sudo mysql -u root userManagement < userManagement.sql
```

### Provide the following details in .env files

- PORT = 5000
- MYSQL_USER = batman
- MYSQL_PORT = 3306 (default)
- MYSQL_PASSWORD = ghost

### To start the project in development mode

```bash
npm run dev
```

### To start the project in production mode

```bash
npm start
```

## Indices

- [User](#ungrouped)
  - [Delete a user](#1-delete-a-user)
  - [Get a particular user's profile](#2-get-a-particular-user's-profile)
  - [Get all users' profile](#3-get-all-users'-profile)
  - [Login a user](#4-login-a-user)
  - [Register a new user](#5-register-a-new-user)
  - [Update a user info](#6-update-a-user-info)

---

## User API endpoints

### Note:- Bearer token is needed as a header for restricted routes

### 1. Delete a user (Private)

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: http://localhost:5000/api/v1/users/2
```

### 2. Get a particular user's profile (Private)

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:5000/api/v1/users/7
```

### 3. Get all users' profile (Private)

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:5000/api/v1/users
```

### 4. Login a user (Public)

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/v1/users/login
```

**_Body:_**

```js
{
    "email": "saurabh@123.com",
    "password": "anukul123"
}
```

### 5. Register a new user (Public)

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: http://localhost:5000/api/v1/users/register
```

**_Body:_**

| Key      | Value                 | Description |
| -------- | --------------------- | ----------- |
| image    |                       |             |
| name     | saurabh               |             |
| email    | saurabh@123.com       |             |
| password | saurabh123            |             |
| age      | 22                    |             |
| address  | Jagdishpiri lane no 4 |             |
| city     | khutahi               |             |
| state    | jharkhand             |             |
| zip      | 842002                |             |

### 6. Update a user info (Private)

**_Endpoint:_**

```bash
Method: PUT
Type: FORMDATA
URL: http://localhost:5000/api/v1/users/7
```

**_Body:_**

| Key      | Value     | Description |
| -------- | --------- | ----------- |
| image    |           |             |
| password | anukul123 |             |

---

[Back to top](#user-management)
