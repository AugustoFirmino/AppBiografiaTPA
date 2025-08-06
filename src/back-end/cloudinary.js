// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Testar conexão com Cloudinary
cloudinary.api.ping()
  .then(res => {
    console.log('✅ Conectado com sucesso ao Cloudinary:', res);
  })
  .catch(err => {
    console.error('❌ Erro ao conectar com o Cloudinary:', err);
  });

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = req.body.id_director
      ? `biografias_directores/${req.body.id_director}`
      : 'biografias_directores/desconhecido';

    return {
      folder,
      resource_type: 'image',
      public_id: `${Date.now()}-${file.originalname}`
    };
  },
});

export { cloudinary, storage };
