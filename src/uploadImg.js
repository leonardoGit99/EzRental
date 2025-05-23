const { google } = require('googleapis');
const streamifier = require('streamifier');
const { auth } = require('./auth');

async function createAndUploadFile(auth, fileImg) {
    if (!fileImg) {
        console.log("No se ha recibido ningún archivo");
        return;
    }

    const driveService = google.drive({ version: 'v3', auth });
    const fileStream = streamifier.createReadStream(fileImg.buffer);

    // Metadata del archivo
    const fileMetadata = {
        name: fileImg.originalname,
        parents: ['1en5W1RlRNG2sWanD2JFMKidYNOHAYrs4'], // tu carpeta en Drive
    };

    const media = {
        mimeType: fileImg.mimetype,
        body: fileStream,
    };

    const response = await driveService.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
    });

    if (response.status !== 200) return "Error";

    const fileId = response.data.id;

    // 👇 Hacer público el archivo
    await driveService.permissions.create({
        fileId: fileId,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });


    // const getLinkRes = await driveService.files.get({
    //     fileId: fileId,
    //     fields: 'webViewLink, webContentLink'
    // });

    // console.log("webViewLink:", getLinkRes.data.webViewLink);
    // console.log("webContentLink:", getLinkRes.data.webContentLink);

    // 👇 Generar enlace directo en el formato deseado
    const publicUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;;
    // publicUrl = publicUrl.replace(/&export=download/, '');
    return publicUrl;
}

module.exports = {
    createAndUploadFile
};

createAndUploadFile(auth).catch(console.error);