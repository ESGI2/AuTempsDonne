const express = require('express');
const RegisterServices = require("../services/register.services");

const router = express.Router();

class RegisterController {
    static async registerBeneficiary(req, res){
        const data = req.body;
        try {
            const user = await RegisterServices.registerBeneficiary(data);
            res.status(200).json({"Message": "Enregistrement d'un utilisateur"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Erreur lors de l'enregistrement de l'utilisateur."});
        }
    }

    static async registerVolunteer(req, res){
        const data = req.body;
        try {
            const user = await RegisterServices.registerVolunteer(data);
            res.status(200).json({"Message": "Enregistrement d'un utilisateur"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Erreur lors de l'enregistrement de l'utilisateur."});
        }
    }
}

module.exports = RegisterController;