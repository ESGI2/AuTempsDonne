const Maraude = require('../models/maraude.model');

class MaraudeRepository {

    //GET ALL & By ID
    static async getAllMaraudes() {
        try {
            return await Maraude.findAll();
        } catch (error) {
            console.error("Maraude error :", error);
            throw error;
        }
    }
    static async getMaraudeById(id){
        try {
            return await Maraude.findByPk(id);
        }catch (error){
            console.error('Maraude error :', error);
            throw error;
        }
    }

    //ADD
    static async addMaraude(maraudeData){
        try {
            return await Maraude.create(maraudeData);
        }catch (error){
            console.error("Maraude error :", error);
            throw error;
        }
    }

    //UPDATE
    static async updateMaraude(id, maraudeData){
        try{
            const maraude = await Maraude.findByPk(id);
            if(!maraude){
                console.error("Maraude not found");
                throw new Error("Maraude not found");
            }return await maraude.update(maraudeData);
        }catch (error){
            console.error("Maraude error :", error);
            throw error;
        }
    }

    //DELETED
    static async deleteMaraude(id){
        try{
            const maraude = await Maraude.findByPk(id);
            if(!maraude){
                console.error("Maraude not found");
                throw new Error("Maraude not found");
            }
            return await maraude.destroy();
        }catch(error){
            console.error("Maraude error : ", error);
            throw error;
        }
    }
}

module.exports = MaraudeRepository;
