const Child = require('../models/child.model');
const moment = require("moment-timezone");

class ChildRepository {
    static async getAllChildren(){
        try {
            return await Child.findAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getChildById(id){
        try {
            return await Child.findByPk(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addChild(childData){
        const dateOfBirth = moment(childData.date_of_birth).tz('Europe/Paris').format('YYYY-MM-DD hh:mm:ss');
        try {
            return await Child.create(
                {
                    first_name: childData.first_name,
                    last_name: childData.last_name,
                    date_of_birth: dateOfBirth,
                    id_user: childData.id_user
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateChild(id, childData){
        const dateOfBirth = moment(childData.date_of_birth).format('YYYY-MM-DD');
        try {
            return await Child.update(
                {
                    first_name: childData.first_name,
                    last_name: childData.last_name,
                    date_of_birth: dateOfBirth,
                    id_user: childData.id_user
                },
                {where: {id}}
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteChild(id) {
        try {
            return await Child.destroy({where: {id}});
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ChildRepository;