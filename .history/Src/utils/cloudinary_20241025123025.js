import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

// إعداد Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// دالة رفع الصورة
export async function uploadImage(filePath, folderName) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: ecommerce1 , 
        });
        return result;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
}

// دالة حذف الصورة
export async function deleteImage(publicId) {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Image with publicId ${publicId} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        throw error;
    }
}

export default cloudinary;
