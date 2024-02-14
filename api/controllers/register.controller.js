const RegisterServices = require("../services/register.services");

class RegisterController {
    static async registerBeneficiary(req, res){
        const data = req.body;
        try {
            await RegisterServices.registerBeneficiary(data);
            res.status(201).json({"Message": "Beneficiary successfully registered"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error registering user"});
        }
    }

    static async registerVolunteer(req, res){
        const data = req.body;
        try {
            await RegisterServices.registerVolunteer(data);
            res.status(201).json({"Message": "Volunteer successfully registered"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error registering user"});
        }
    }
}

module.exports = RegisterController;