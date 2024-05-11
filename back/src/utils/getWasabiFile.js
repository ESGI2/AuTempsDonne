// import AWS from "aws-sdk";
// // Configurer les informations d'identification
// const accessKeyId = 'OAD77C2QY8CRH2FG2N9Z';
// const secretAccessKey = 'lHcIiu0TvjQFjLJOjskdp0mZALzHJP6zFRLzMuNy';
//
// // Configurer la région de votre bucket Wasabi
// const region = 'eu-central-1'; // Remplacez par votre région Wasabi
//
// // Configurer le nom de votre bucket Wasabi
// const bucketName = 'autempsdonne';
//
// // Configurer la fonction pour récupérer le fichier à partir du bucket Wasabi
// async function getMaraudeFile(maraudeId) {
//     // Configurer les informations d'identification dans l'objet AWS
//     const credentials = new AWS.Credentials({
//         accessKeyId: accessKeyId,
//         secretAccessKey: secretAccessKey
//     });
//
//     // Configurer l'objet S3
//     const s3 = new AWS.S3({
//         credentials: credentials,
//         region: region
//     });
//
//     // Configurer le chemin du fichier dans le bucket
//     const filePath = `maraude/maraude_map_${maraudeId}.html`;
//
//     // Définir les paramètres pour télécharger le fichier
//     const params = {
//         Bucket: bucketName,
//         Key: filePath
//     };
//
//     // Télécharger le fichier depuis le bucket et renvoyer son contenu
//     return new Promise((resolve, reject) => {
//         s3.getObject(params, function(err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data.Body.toString());
//             }
//         });
//     });
// }
//
// export default getMaraudeFile;