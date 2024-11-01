

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
  const subCategory = await subCategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "subCategory not found" });
  }

  subCategory.name = req.body.name.toLowerCase();
  if (await subCategoryModel.findOne({ name: req.body.name, _id: { $ne: req.params.id } })) { 
    return res.status(409).json({ message: "sub category name is already exists" });
  }

  subCategory.slug = slugify(req.body.name);

  // رفع صورة جديدة إذا تم إرسال ملف جديد
  if (req.file) {
    const { secure_url, public_id } = await uploadImage(req.file.path, `${process.env.APPNAME}/subCategories`);
    await deleteImage(csubCategory.image.public_id); 
    subCategory.image = { secure_url, public_id };
  }

  subCategory.status = req.body.status;
  subCategory.updatedBy = req.user._id;
  await subCategory.save();

  return res.json({ message: "success", subCategory });
};





  export const destroy = async (req, res) => {
  const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "category is not found" });
  }

  await deleteImage(category.image.public_id); // حذف الصورة من Cloudinary
  return res.status(200).json({ message: "success", category });
};
