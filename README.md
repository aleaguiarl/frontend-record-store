
# Bootplay - Frontend

This project serves as the frontend for a digital album store named Bootplay. The goal of the project is to provide a user-friendly interface, allowing users to easily create an account, log in, purchase, and view their albums.

![enter image description here](https://i.imgur.com/JnrBsan.png)
---
## How to run
Clone the repository
```
git clone https://github.com/bc-fullstack-04/alexandre-aguiar-frontend/
```
Install the dependencies
```
npm install
```

Run the client
```
npm run build
```
Go to 
```
http://localhost:5173/ 
```
*5173 is the default for vite, please, check your terminal after build to be sure abour the port*

## **List of paths**:

**Public paths**
- Home:  "/"
 - Signup:  "/signup"
 - Login: "/login"

**Private paths:**
 - Dashboard: "/dashboard"
 - Album collection: "/my-collection"

The public paths are acessible without authentication, while the private paths needs it.

---
Link to the backend: https://github.com/bc-fullstack-04/alexandre-aguiar-backend
