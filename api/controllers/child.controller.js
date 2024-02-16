const ChildService = require("../services/child.service");

class ChildController {
    static async getAllChildren(req, res){
        try {
            const children = await ChildService.getAllChildren();
            res.status(200).json(children);
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    static async getChildById(req, res){
        const id = req.params.id;
        try {
            const child = await ChildService.getChildById(id);
            if (!child) res.status(404).json({message: "Child not found"});
            res.status(200).json(child);
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    static async addChild(req, res){
        const data = req.body;
        data.id_user = req.user.id;

        try {
            const child = await ChildService.addChild(data);
            res.status(201).json({"Message": "Child added successfully"});
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    static async updateChild(req, res){
        const id = req.params.id;
        const data = req.body;
        try {
            const child = await ChildService.updateChild(id, data);
            res.status(200).json({"Message": "Child updated successfully"});
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    static async deleteChild(req, res){
        const id = req.params.id;
        try {
            const child = await ChildService.deleteChild(id);
            if (!child) res.status(404).json({message: "Child not found"});
            res.status(200).json({"Message": "Child deleted successfully"});
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }
}

module.exports = ChildController;