const streamifier = require('streamifier'); 
const { GeneralError } = require('../utils/errors');
const cloudinary = require('cloudinary').v2;
//Get cloud_name, api_key and api_secret from .env
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function streamUpload(req, res, next) {
    try {
        const streamUpload = (req) => {
          return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                  if (result) {
                    resolve(result);
                  } else {
                    reject(error);
                  }
                }
              );
      
              streamifier.createReadStream(req.file.buffer).pipe(stream);
          });
        }
    
        const result = await streamUpload(req);
        if(!result) {
            throw new GeneralError("Upload error.")
        }
        req.body.imageUrl = result.url;
        next();
    } catch(err) {
        next(err);
    }
};

module.exports = streamUpload;
