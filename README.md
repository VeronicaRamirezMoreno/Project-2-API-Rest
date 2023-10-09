# Project-2-API-Rest
VETERINARY CLINIC MANAGEMENT SYSTEM

### Authentication Endpoints
The Authentication flow for the application is:


### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | user | User Signup              | `first_name`, `last_name`, `email`, `password`, `DNI`  | { token: `token` }
POST   | /auth/login      | -     | user | User Login               | `email`, `password`                             | { token: `token` }


### User Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /user            | YES   | personnel | Get All Users       |  `query params`                                 | [{user}]
GET    | /user            | YES   | admin | Get All Users           |  `query params`                                 | [{user}]
GET    | /user/profile    | YES   | user | Get Own Profile          |                                                 |  {user}
POST   | /user            | YES   | admin |  Create one user        | `first_name`, `last_name`, `email`, `password`, `DNI`  | {user}
POST   | /user            | YES   | personnel |  Create one user     | `first_name`, `last_name`, `email`, `password`, `DNI`  | {user}
PUT    | /user/profile   | YES   | user |  Update own user     | `first_name`, `last_name`, `email`, `password`, `DNI`  | {message: 'User updated'}
PUT    | /user/:userId    | YES   | admin |  Update one user     | `first_name`, `last_name`, `email`, `password`, `DNI`  | {message: 'User updated'}
PUT    | /user/:userId    | YES   | personnel |  Update one user     | `first_name`, `last_name`, `email`, `password`, `DNI`  | {message: 'User updated'}
PUT    | /user/password   | YES   | user  | Reset password          | `newPassword` `repeatPassword`                      | { message: 'Password updated }
DELETE | /user/profile    | YES   | user | Delete own profile       |                                                    | { message: 'Profile deleted' }
DELETE | /user/:userId    | YES   | admin | Delete one user         |                                                   | {message: 'User deleted'}
DELETE | /user/:userId    | YES   | personnel | Delete one user      |                                                   | {message: 'User deleted'}




### Post Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /post            | YES   | user | Get All Posts          |  `query params`                            | [{post}]
GET    | /post/profile    | YES   | user | Get Own Posts          |                                            | [{post}]
GET    | /post/:postId       | YES   | user | Get One Post           |                                            | {post}
GET    | /post/:userId/all    | YES   | user | Get One User's posts   |                                            | [{post}]
PUT    | /post/:postId/like   | YES   | user | Like one post          |                                            | {post}
