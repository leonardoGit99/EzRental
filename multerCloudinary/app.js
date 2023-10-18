require('dotenv').config();
const express = require('express');
const app = express();
const upload = require('./multer');
const connection = require('./database');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

function uploadImage(req, res, next) {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const imageFile = req.file;

        const { originalname, mimetype, buffer } = imageFile;
        cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            const { public_id } = result;
            const urlImagen = cloudinary.url(public_id, {
                width: 150,
                height: 100,
                crop: 'fill'
            });
            const data = {
                nombreImagen: originalname,
                tipoImagen: mimetype,
                urlImagen: urlImagen,
                idPublicoImagen: public_id
            }

            const sql = 'INSERT INTO imagen SET ?';
            connection.query(sql, data, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({
                    message: 'Imagen cargada'
                });
            });
        }).end(buffer);
    });
}

app.post('/upload', uploadImage);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Corrige la ruta al archivo 'index.html'
});

app.get('/images', (req, res) => {
    const sql = 'SELECT * FROM imagen';
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
