# Project-2-API-Rest
VETERINARY CLINIC MANAGEMENT SYSTEM


## Summary

### Team:
Guaci, Marcos and Vero.

### Project Idea:
This project consists of creating an API that facilitates the management of medical appointments for a veterinary clinic. The clinic will control the registration of owners and pets, appointments, treatment follow-up and the assignment of veterinarians. Owners will be able to request appointments for their pets, as well as consult their record at any time and the information of the veterinarians and treatments available at the clinic.

Roles: There will be 3 main roles:
- Admin: This role has full permissions. It can view, create, update and delete information from all tables.
- Personnel (clinic staff): This role can see all the information. Create, update and delete pets, owners, contact details, appointments. You can view vet and treatment information, but you can NOT create, update, or delete it.
- User (pet owner): This role can view all vet and treatment information. But you can only see your own appointments, pets and contact information (not other users). Likewise, you can only create, update and delete your own data. You have access to the information of all available appointments and the possibility to update the "status" field of the appointments when you select one to book for your pet, so that its status changes to "not available".

### Tables:
![image](https://github.com/VeronicaRamirezMoreno/Project-2-API-Rest/assets/122170615/7a72f051-7e2a-4788-92b4-6534fb84b5a8)


### Relationships between tables:

#### One to one:
- Ref: Owners.id_Owner - Contact_information.id_ContactInfo -- One contact info belongs to only one owner.

#### One to many:
- Ref: Pets.id_Pet > Owners.id_Owner -- One owner may have many pets
- Ref: Appointments.id_Appointment > Pets.id_Pet -- One vet can have many appointments
- Ref: Appointments.id_Appointment  >  Vets.id_Vet -- One pet can have many appointments

#### Many to many:
- Ref: Appointments <> Treatments -- A treatment can have several appointments, and several treatments can be given at the same appointment.


### Authentication Endpoints
The Authentication flow for the application is:
![image](https://github.com/VeronicaRamirezMoreno/Project-2-API-Rest/assets/122170615/d9dbe992-f67e-4ec9-9883-36757707d880)


## Endpoints
### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | user | User Signup              | `first_name`, `last_name`, `email`, `password`, `DNI`  | { token: `token` }
POST   | /auth/login      | -     | user | User Login               | `email`, `password`                             | { token: `token` }


### User Endpoints 

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /user            | YES   | personnel | Get All Users       |  `query params`                                 | [{user}]
GET    | /user/profile    | YES   | user | Get Own Profile          |                                                 |  {user}
POST   | /user            | YES   | personnel |  Create one user     | `first_name`, `last_name`, `email`, `password`, `DNI`  | {user}
PUT    | /user/profile   | YES   | user |  Update own user     | `first_name`, `last_name`, `email`, `password`, `DNI`  | {message: 'User updated'}
PUT    | /user/:userId    | YES   | personnel |  Update one user     | `first_name`, `last_name`, `email`, `password`, `DNI`  | {message: 'User updated'}
PUT    | /user/password   | YES   | user  | Reset password          | `newPassword` `repeatPassword`                      | { message: 'Password updated }
DELETE | /user/profile    | YES   | user | Delete own profile       |                                                    | { message: 'Profile deleted' }
DELETE | /user/:userId    | YES   | personnel | Delete one user      |                                                   | {message: 'User deleted'}


### User Contact_info Endpoints 

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /contact_info    | YES   | personnel | Get All Contact_info       |  `query params`                                 | [{contact_info}]
GET    | /contact_info/profile    | YES   | user | Get Own Profile          |                                                 |  {contact_info}
POST   | /contact_info/profile    | YES   | user |  Create Own Contact_indo  | `phone`, `address`              |{contact_info}
POST   | /contact_info             | YES   | personnel | Create one Contact_info    | `phone`, `address`       | {contact_info}
PUT    | /contact_info /profile   | YES   | user |  Update own contact_info      | `phone`, `address`   | {message: 'Contact information updated'}
PUT    | /contact_info /:contact_infoId    | YES   | personnel |  Update one contact_info      | `phone`, `address`    | {message: 'Contact information updated'}
DELETE | /contact_info /profile    | YES   | user | Delete own contact_info       |                                               | { message: 'Contact information deleted' }
DELETE | /contact_info /:contact_infoId      | YES   | personnel | Delete one contact_info     |                                  | {message: 'Contact information deleted'}

### Personnel Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/login      | -     | personnel | User Login               | `email`, `password`                             | { token: `token` }

### Personnel Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /vet            | YES   | user | Get All Vets       |  `query params`                                 | [{vet}]
GET    | /vet/:vetId      | YES   | user | Get One Vet       |                               | [{vet}]
POST   | /vet            | YES   | admin |  Create one Vet        | `membership_num`,`first_name`, `last_name`, `email`, `password`, `phone`, `specializaition`, `profile_picture`  | {vet}
PUT   |  /vet/:vetId     | YES   | admin |  Update one Vet        | `membership_num`, `first_name`, `last_name`, `email`, `password`, `phone`, `specializaition`, `profile_picture`  | {message: 'Vet updated'}
PUT    | /vet/password   | YES   | personnel  | Reset password          | `newPassword` `repeatPassword`                      | { message: 'Password updated }
DELETE | /vet/:vetId    | YES   | admin | Delete one user         |                                                   | {message: 'Vet deleted'}


### Pet Endpoints 

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /pet            | YES   | personnel | Get All Pets       |  `query params`                                 | [{pet}]
GET    | /pet/profile    | YES   | user | Get own Pet          |                                                 |  {pet}
POST   | /pet/profile   | YES   | user |  Create own Pet        | `name`, `birth_date`, `chip_num`, `species`, `breed`, `sex`, `profile_picture`, `comments` | {pet}
POST   | /pet            | YES   | personnel |  Create one Pet   | `name`, `birth_date`, `chip_num`, `species`, `breed`, `sex`, `profile_picture`, `comments` | {pet}
PUT  | /pet/profile  | YES   | user |  Update own Pet | `name`, `birth_date`, `chip_num`, `species`, `breed`, `sex`, `profile_picture`, `comments`| {message: 'Pet updated'}
PUT    | /pet/:petId     | YES   | personnel |  Update one Pet     | `name`, `birth_date`, `chip_num`, `species`, `breed`, `sex`, `profile_picture`, `comments`| {message: 'Pet updated'}
DELETE | /pet/profile    | YES   | user | Delete own Pet       |                                                    | { message: 'Pet deleted' }
DELETE | /pet/:petId    | YES   | personnel | Delete one Pet      |                                                   | {message: 'Pet deleted'}


### Appointments Endpoints 

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /appointment            | YES   | personnel |Get All Appointments     |  `query params`                                 | [{appointment}]
GET    | /appointment/profile    | YES   | user | Get own Appointments        |                                                 |  {appointment}
GET    | /appointment/available    | YES   | user | Get available Appointments   |                                                |  {appointment}
POST   | /appointment   | YES   | personnel |  Create one Appointment | `appointment_date`, `appointment_time`, `description`, `duration`, `status` | {appointment}
PUT    | /appointment/available  | YES   | user |  Update own Appointment |   `status`   | {message: 'Appointment updated'}
PUT    | /appointment/:appointmentId     | YES   | personnel |  Update one Appointment     | `appointment_date`, `appointment_time`, `description`, `duration`, `status`| {message: 'Appointment updated'}
DELETE | /appointment/profile    | YES   | user | Delete own Appointment       |                                               | { message: 'Appointment deleted' }
DELETE | /appointment/:appointmentId    | YES   | personnel | Delete one Appointment      |                                            | {message: 'Appointment deleted'}


### Treatments Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /treatment            | YES   | user | Get All Treatments       |  `query params`                                 | [{treatment}]
GET    | /treatment/:treatmentId      | YES   | user | Get One Treatment       |                               | [{treatment}]
POST   | /treatment            | YES   | admin |  Create one Treatment        | `name`,`description`, `price` | {treatment}
PUT   |  /treatment/:treatmentId     | YES   | admin |  Update one Treatment        | `name`,`description`, `price` | {message: 'Treatment updated'}
DELETE | /treatment/:treatmentId     | YES   | admin | Delete one Treatment         |                                                   | {message: 'Treatment deleted'}
