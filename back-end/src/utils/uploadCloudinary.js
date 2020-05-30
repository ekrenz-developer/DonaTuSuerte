import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';

const uploadCloudinary = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(err);
      }
    });
    
    streamifier.createReadStream(file.buffer).pipe(stream);
  })
}

export default uploadCloudinary;