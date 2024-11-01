

import categoryModel from '../../../DB/models/category.model.js';
import{ uploadImage, deleteImage }  from '../../utils/cloudinary.js';
import slugify from 'slugify';
import subCategoryModel from '../../../DB/models/subCategory.model.js';



export const create = async (req, res) => {

    const {categoryId}=req.body;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"category not found"})
    }

  req.body.name = req.body.name.toLowerCase();
  // التحقق من وجود اسم  التصنيف  بالفعل
  if (await categoryModel.findOne({ name: req.body.name })) { 
    return res.status(409).json({ message: "category already exists" });
  }

  req.body.slug = slugify(req.body.name);
  // رفع الصورة إلى Cloudinary
  const { secure_url, public_id } = await uploadImage(req.file.path, `${process.env.APPNAME}/subCategories`);
  req.body.image = { secure_url, public_id };
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;

  // إنشاء الفئة في قاعدة البيانات
  const subCategory = await subCategoryModel.create(req.body);
  return res.json({ message: "success", subCategory });
};


export const getAll = async (req, res) => {
  const subCategories = await subCategoryModel.find({});
  return res.status(200).json({ message: "success", subCategories });
};


export const getActive = async (req, res) => {
  const subCategories = await subCategoryModel.find({ status: 'active' });
  return res.status(200).json({ message: "success", subCategories });
};


export const getDetails = async (req, res) => {
  const subCategory = await subCategoryModel.findById(req.params.id);
  return res.status(200).json({ message: "success", subCategory });
};



export const update = async (req, res) => {
    try {
      const subCategory = await subCategoryModel.findById(req.params.id);
      if (!subCategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
  
      // تحديث الاسم إذا تم تقديمه
      if (req.body.name) {
        // التحقق من الاسم المتكرر إذا تم تقديمه
        const existingSubCategory = await subCategoryModel.findOne({
          name: req.body.name.toLowerCase(),
          _id: { $ne: req.params.id },
        });
        if (existingSubCategory) {
          return res.status(409).json({ message: "Subcategory name already exists" });
        }
  
        subCategory.name = req.body.name.toLowerCase();
        subCategory.slug = slugify(req.body.name);
      }
  
      // تحديث الصورة إذا تم تقديم ملف جديد
      if (req.file) {
        const { secure_url, public_id } = await uploadImage(req.file.path, `${process.env.APPNAME}/subCategories`);
        
        // حذف الصورة القديمة من Cloudinary إذا كانت موجودة
        if (subCategory.image && subCategory.image.public_id) {
          await deleteImage(subCategory.image.public_id);
        }
  
        // تحديث تفاصيل الصورة
        subCategory.image = { secure_url, public_id };
      }
  
      // تحديث الحالة والمعلومات الأخرى
      if (req.body.status) subCategory.status = req.body.status;
      subCategory.updatedBy = req.user._id;
  
      await subCategory.save();
      return res.json({ message: "Update successful", subCategory });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
 
  export const destroy = async (req, res) => {
    try {
      const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id);
      if (!subCategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
  
      // Delete the image from Cloudinary, if it exists
      if (subCategory.image && subCategory.image.public_id) {
        await deleteImage(subCategory.image.public_id);
      }
  
      return res.status(200).json({ message: "Deleted successful", subCategory });
    } catch (error) {
      console.error("Deletion error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  