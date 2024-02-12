const express = require('express');
const UserServices = require("../services/user.services");

const router = express.Router();

class UserController {
    static async getAllUsers(req, res){
        try {
            const users = await UserServices.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Erreur lors de la récupération des utilisateurs."});
        }
    }
}

module.exports = UserController;