const AWS = require('aws-sdk');

class WasabiService {
    static async getMaraudeFile(id) {
        const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
        const s3 = new AWS.S3({
            endpoint: wasabiEndpoint,
            accessKeyId: process.env.WASABI_ACCESS_KEY_ID,
            secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY,
            region: 'eu-central-1'
        });

        const params = {
            Bucket: 'autempsdonne',
            Key: 'maraude/maraude_map_' + id + '.html'
        };

        try {
            const data = await s3.getObject(params).promise();
            return data.Body.toString();
        } catch (err) {
            console.error('Erreur lors de la récupération du fichier:', err);
            throw err;
        }
    }

    static async getDeliveryFile(id) {
        const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
        const s3 = new AWS.S3({
            endpoint: wasabiEndpoint,
            accessKeyId: process.env.WASABI_ACCESS_KEY_ID,
            secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY,
            region: 'eu-central-1'
        });

        const params = {
            Bucket: 'autempsdonne',
            Key: 'delivery/delivery_map_' + id + '.html'
        };

        try {
            const data = await s3.getObject(params).promise();
            return data.Body.toString();
        } catch (err) {
            console.error('Erreur lors de la récupération du fichier:', err);
            throw err;
        }
    }
}

module.exports = WasabiService;
