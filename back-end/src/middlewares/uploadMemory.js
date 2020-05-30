import multer from 'multer';
import storage from '../config/storage';

const uploadMemory = multer({ storage: storage })

export default uploadMemory;