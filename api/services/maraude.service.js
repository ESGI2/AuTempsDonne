const MaraudeRepository = require('../repositories/maraude.repository');

class MaraudeService {
    //GET ALL & By ID
    static getAllMaraudes() {
        return MaraudeRepository.getAllMaraudes();
    }

    static getMaraudeById(id) {
        return MaraudeRepository.getMaraudeById(id);
    }

    //ADD
    static async addMaraude(maraudeData) {
        return MaraudeRepository.addMaraude(maraudeData);
    }

    //UPDATE
    static async updateMaraude(id, maraudeData) {
        const maraude = await MaraudeRepository.getMaraudeById(id);
        if (!maraude) {
            throw new Error("Maraude not found");
        }
        return MaraudeRepository.updateMaraude(id, maraudeData);
    }

    //DELETE
    static async deleteMaraude(id) {
        const maraude = await MaraudeRepository.getMaraudeById(id);
        if (!maraude) {
            throw new Error("Maraude not found");
        }
        return MaraudeRepository.deleteMaraude(id);
    }
}

module.exports = MaraudeService;