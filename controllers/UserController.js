const { set } = require("mongoose");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
async function GetUsers(req, res) {
  try {
    let allUsers = await UserModel.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
async function DeleteUser(req, res) {
    let DelEmail=req.params.email;
    try {
      let allUsers = await UserModel.deleteMany({email:DelEmail});
      res.status(200).json({message:"Users deleted"});
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }


  async function EditUser(req, res) {
    const id = req.params.id; // Assuming the ID is passed as a URL parameter
    const data = req.body; // New data for updating the user
  
    try {
      // Find the user by _id and update with the provided data
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },          // Query to find user by _id
        { $set: data },       // Set the new data for the user
        { new: true, runValidators: true } // Return the updated document, and run validators
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" }); // Handle case where user doesn't exist
      }
  
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  

  

 
  
  async function RegisterUser(req, res) {
    const { email, name, password } = req.body;
    let errors = [];
  
    // Check if all fields are provided
    if (!email || !name || !password) {
      errors.push({ message: "Please fill all fields" });
      return res.status(400).json(errors); // Early return to prevent further execution
    }
  
    // Check if the email already exists
    let checkEmail = await UserModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(400).json({ message: "User already exists" }); // Return if user exists
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user with the hashed password
      let CreateUser = await UserModel.create({ email, name, password: hashedPassword });
  
      // Send a success response
      res.status(201).json({ message: "User is created", user: CreateUser });
    } catch (error) {
      // Handle any errors during user creation
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  }
  

  
module.exports = {
  GetUsers,
  RegisterUser,DeleteUser, EditUser
};
