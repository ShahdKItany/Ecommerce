import 'dotenv/config'; // استيراد المتغيرات البيئية من ملف .env
import { v2 as cloudinary } from 'cloudinary'; // استيراد Cloudinary



cloudinary.config({ 
    cloud_name: process.env.cloud_name, // اسم حسابك في Cloudinary
    api_key: process.env.api_key,       
    api_secret: process.env.api_secret  
});

export default cloudinary; 
