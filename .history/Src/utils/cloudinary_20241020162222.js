import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary'; 



cloudinary.config({ 
    cloud_name: process.env.cloud_name, // اسم حسابك في Cloudinary
    api_key: process.env.api_key,       // مفتاح API الخاص بحسابك
    api_secret: process.env.api_secret  // المفتاح السري لـ API
});

export default cloudinary; 
