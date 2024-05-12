const MaraudeContentService = require('../services/maraudeContent.service');
const ProductService = require('../services/product.services');

class MaraudeContentController {

    static async getAll(req, res) {
        try {
            const maraudeContents = await MaraudeContentService.getAll();
            res.status(200).json(maraudeContents);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error getting maraude contents"});
        }
    }

    static async getProductByMaraude(req, res) {
        try {
            const id = req.params.id;
            const maraudeContents = await MaraudeContentService.getProductByMaraude(id);
            if (!maraudeContents) {
                res.status(404).json({"Error": "Maraude content not found"});
                return;
            }
            res.status(200).json(maraudeContents);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error getting maraude contents"});
        }
    }

    static async create(req, res) {
        try {
            const {id_maraude, id_product, quantity} = req.body;
            if (!id_maraude || !id_product || !quantity) {
                res.status(400).json({"Error": "Missing parameters"});
                return;
            }
            const newMaraudeContent = await MaraudeContentService.create({id_maraude, id_product, quantity});
            res.status(201).json({"Message": "Maraude content added", newMaraudeContent});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error adding maraude content"});
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await MaraudeContentService.delete(id);
            res.status(204).json({"Message": "Maraude content deleted"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error deleting maraude content"});
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const {id_maraude, id_product, quantity} = req.body;
            if (!id_maraude || !id_product || !quantity) {
                res.status(400).json({"Error": "Missing parameters"});
                return;
            }
            await MaraudeContentService.update(id, {id_maraude, id_product, quantity});
            res.status(204).json({"Message": "Maraude content updated"});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error updating maraude content"});
        }
    }
}

module.exports = MaraudeContentController;

