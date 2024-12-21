const { Router } = require("express");
const { GetUsers, RegisterUser, DeleteUser, EditUser } = require("../controllers/UserController");


const route = new Router();

// Add routes
route.get("/", GetUsers);
route.post("/register", RegisterUser);
route.delete("/user/:email", DeleteUser);
route.put("/user/:id", EditUser);
module.exports = route;
