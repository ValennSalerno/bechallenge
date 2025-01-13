import express from 'express';
import * as middlewares from '../middlewares';
import AWS from 'aws-sdk';
//import { access } from 'fs'; para imagenes luego

const router1 = express.Router();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

router1.post('/upload', middlewares.auth, async (req, res) => {
  try {
    // ver como obtengo el file
    const fileContent = req.body.file;
    
    await s3.putObject({
      Bucket: 'ss-be-challenge',
      Key: 'sshot.png',
      Body: fileContent,
    }).promise();

    res.status(200).send('Archivo subido a S3 correctamente');
  } catch (error) {
    console.error('Error al subir a S3:', error);
    try {
      //subo a dropbox 
      res.status(200).send('Archivo subido a Dropbox debido a un error en S3');
    } catch (dropboxError) {
      console.error('Error al subir a Dropbox:', dropboxError);
      res.status(500).send('Error al subir el archivo');
    }
  }
});

router1.get('/stats', middlewares.auth, async (req, res) => {
  const user = req.user;

  if (user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  //
  
}); 

export default router1;