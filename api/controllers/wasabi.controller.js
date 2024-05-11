const WasabiService = require('../services/wasabi.service');

class WasabiController {
    static async getMaraudeFile(req, res) {
        try {
            const { id } = req.params;
            const fileContent = await WasabiService.getMaraudeFile(id);

            if (fileContent) {
                res.status(200).send(fileContent);
            } else {
                res.status(404).send('File not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = WasabiController;
