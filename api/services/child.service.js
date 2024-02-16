const ChildRepository = require('../repositories/child.repository');

class ChildService {
    static async getAllChildren(){
        try {
            const children = await ChildRepository.getAllChildren();
            return children;
        }catch (error){
            console.error(error);
            throw error;
        }
    }
    static async getChildById(id){
        try{
            const child = await ChildRepository.getChildById(id);
            return child;
        }catch (error){
            console.error(error);
            throw error;
        }

    }

    static async addChild(childData){
        try {
            return await ChildRepository.addChild(childData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateChild(id, childData) {
        try {
            return await ChildRepository.updateChild(id, childData);
        } catch {
            console.error(error);
            throw error;
        }
    }

    static async deleteChild(id){
        try {
            return await ChildRepository.deleteChild(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ChildService;