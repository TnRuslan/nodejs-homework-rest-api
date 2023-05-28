# Fonebook REST API

---

- The Project when you can create, edit and save your contacts.

- The Project is base on Node.js, Express and MongoDB.

- To run the project locally, follow these steps:

1. Clone the repository;
2. Install the dependencies: `npm install`
3. Run in dev: `npm run start:dev`
4. Run the following command: `npm start`;
---

<div align="center">

### Auth Endpoints

| HTTP Method | Endpoint                         | Description              |
| ----------- | -------------------------------- | ------------------------ |
| POST        | `/auth/registration`             | User registration        |
| POST        | `/auth/login`                    | User login               |
| GET         | `/auth/verify/:verificationCode` | User varification code   |
| POST        | `/auth/verify`                   | User resend verify email |

### User Endpoints

| HTTP Method | Endpoint             | Description              |
| ----------- | -------------------- | ------------------------ |
| GET         | `/user/current`      | Get current user         |
| POST        | `/user/logout`       | User Log out             |
| POST        | `/user/subscription` | Change user subscription |
| PATCH       | `/user/avatars`      | Add user avatar          |

### Contacts Endpoints

| HTTP Method | Endpoint                        | Description             |
| ----------- | ------------------------------- | ----------------------- |
| GET         | `/contacts/`                    | Get all user`s contacts |
| GET         | `/contacts/:contactId`          | Get contact by id       |
| POST        | `/contacts/`                    | Add contact             |
| DELETE      | `/contacts/:contactId`          | Delete contact          |
| PUT         | `/contacts/:contactId`          | Update contact          |
| PATCH       | `/contacts/:contactId/favorite` | Update contact`s status |
