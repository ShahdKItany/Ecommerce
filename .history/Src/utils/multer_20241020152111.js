import multer from 'multer';
//import cloudinary from './cloudinary.js';  



export const fileType=  {

    image:['image/png','image/jpeg','image/webp'],
    pdf:['application/pdf']
};


function fileUpload(customTypes= []){

const storage= multer.diskStorage({});

function filefil


const upload=multer(storage);
return upload;
}
export default fileUpload;