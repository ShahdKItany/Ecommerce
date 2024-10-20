import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dnmumvuli', 
        api_key: '618144739129373', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
// استيراد Cloudinary
import { v2 as cloudinary } from 'cloudinary';

// تهيئة Cloudinary باستخدام متغيرات البيئة
cloudinary.config({
    cloud_name: process.env.cloud_name,  // اسم الحساب في Cloudinary
    api_key: process.env.api_key,  // مفتاح API الخاص بحساب Cloudinary
    api_secret: process.env.api_secret  // المفتاح السري لـ Cloudinary
});

export default cloudinary;
