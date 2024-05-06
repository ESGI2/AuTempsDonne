const MaraudContent = require('../models/maraudeContent.model');

class MaraudContentRepository {

        static async getAll() {
            try {
                return await MaraudContent.findAll();
            } catch (error) {
                throw error;
            }
        }

        static async getByMaraude(id) {
            try {
                return await MaraudContent.findAll({ where: { id_maraude: id } });
            } catch (error) {
                throw error;
            }
        }

        static async create({ id_maraude, id_product, quantity }) {
            try {
                return await MaraudContent.create({ id_maraude, id_product, quantity });
            } catch (error) {
                throw error;
            }
        }

        static async delete(id) {
            try {
                return await MaraudContent.destroy({ where: { id_maraude: id } });
            } catch (error) {
                throw error;
            }
        }

        static async update(id, { id_maraude, id_product, quantity }) {
            try {
                return await MaraudContent.update({ id_maraude, id_product, quantity }, { where: { id_maraude: id } });
            } catch (error) {
                throw error;
            }
        }
}

module.exports = MaraudContentRepository;