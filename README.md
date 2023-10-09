# Project-2-API-Rest
VETERINARY CLINIC MANAGEMENT SYSTEM

### Our team:
Guaci, Marcos and Vero.

### Our project:

This project consists of creating an API that facilitates the management of medical appointments for a veterinary clinic. The clinic will control the registration of owners and pets, appointments, treatment follow-up and the assignment of veterinarians. Owners will be able to request appointments for their pets, as well as consult their record at any time and the information of the veterinarians and treatments available at the clinic.

Roles: There will be 3 main roles:
- Admin: This role has full permissions. It can view, create, update and delete information from all tables.
- Personnel (clinic staff): This role can see all the information. Create, update and delete pets, owners, contact details, appointments. You can view vet and treatment information, but you can NOT create, update, or delete it.
- User (pet owner): This role can view all vet and treatment information. But you can only see your own appointments, pets and contact information (not other users). Likewise, you can only create, update and delete your own data. You have access to the information of all available appointments and the possibility to update the "status" field of the appointments when you select one to book for your pet, so that its status changes to "not available".

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

### User Contact_info Endpoints 

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /contact_info    | YES   | personnel | Get All Contact_info       |  `query params`                                 | [{contact_info}]
GET    | /contact_info              | YES   | admin |Get All Contact_info   |  `query params`                                 | [{contact_info}]
GET    | /contact_info/profile    | YES   | user | Get Own Profile          |                                                 |  {contact_info}
POST   | /contact_info/profile    | YES   | user |  Create Own Contact_indo  | `phone`, `address`              |{contact_info}
POST   | /contact_info          | YES   | admin |  Create one Contact_info        |`phone`, `address`           |{contact_info}
POST   | /contact_info             | YES   | personnel | Create one Contact_info    | `phone`, `address`       | {contact_info}
PUT    | /contact_info /profile   | YES   | user |  Update own contact_info      | `phone`, `address`   | {message: 'Contact information updated'}
PUT    | /contact_info /:contact_infoId      | YES   | admin |  Update one contact_info      | `phone`, `address`    |{message: 'Contact information updated'}
PUT    | /contact_info /:contact_infoId    | YES   | personnel |  Update one contact_info      | `phone`, `address`    | {message: 'Contact information updated'}
DELETE | /contact_info /profile    | YES   | user | Delete own contact_info       |                                               | { message: 'Contact information deleted' }
DELETE | /contact_info /:contact_infoId      | YES   | admin | Delete one contact_info         |                                  | {message: 'Contact information deleted'}
DELETE | /contact_info /:contact_infoId      | YES   | personnel | Delete one contact_info     |                                  | {message: 'Contact information deleted'}

### Personnel Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/login      | -     | personnel | Vet Login               | `email`, `password`                             | { token: `token` }

### Personnel Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /vet            | YES   | user | Get All Vets       |  `query params`                                 | [{vet}]
GET    | /vet            | YES   | personnel | Get All Vets       |  `query params`                                 | [{vet}]
GET    | /vet            | YES   | admin | Get All Vets       |  `query params`                                 | [{vet}]
GET    | /vet/:vetId      | YES   | user | Get All Vets       |                               | [{vet}]
GET    | /vet/:vetId      | YES   | admin | Get All Vets       |                               | [{vet}]
GET    | /vet/:vetId      | YES   | personnel | Get All Vets       |                               | [{vet}]
POST   | /vet            | YES   | admin |  Create one Vet        | `membership_num`, `first_name', `last_name`, `email`, `password`, `phone`, `specializaition`, `profile_picture`  | {vet}
PUT   |  /vet/:vetId     | YES   | admin |  Update one Vet        | `membership_num`, `first_name', `last_name`, `email`, `password`, `phone`, `specializaition`, `profile_picture`  | {message: 'Vet updated'}
PUT    | /vet/password   | YES   | personnel  | Reset password          | `newPassword` `repeatPassword`                      | { message: 'Password updated }
DELETE | /vet/:vetId    | YES   | admin | Delete one user         |                                                   | {message: 'Vet deleted'}





