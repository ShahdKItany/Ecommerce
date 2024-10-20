import multer from 'multer';
//import cloudinary from './cloudinary.js';  



export const fileType=  {

    image:['image/png','image/jpeg','image/webp'],
    pdf:['application/pdf']
};


function fileUpload(customTypes= []){

const storage= multer.diskStorage({});

function fileFilter(req,file,cb){

    if(customTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb("invalid format",false);
    }
}


const upload=multer({storage);
return upload;
}
export default fileUpload;