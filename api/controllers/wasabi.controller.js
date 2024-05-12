const WasabiService = require('../services/wasabi.service');

class WasabiController {
    static async getMaraudeFile(req, res) {
        try {
            const { id } = req.params;
            const fileContent = await WasabiService.getMaraudeFile(id);

            if (fileContent) {
                // Définir les en-têtes de réponse pour spécifier le type de contenu et le nom du fichier
                res.setHeader('Content-Type', 'text/html');
                res.setHeader('Content-Disposition', `attachment; filename="maraude_map_${id}.html"`);

                // Envoyer le contenu du fichier en tant que réponse
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
