

import categoryModel from '../../../DB/models/category.model.js';
import{ uploadImage, deleteImage }  from '../../utils/cloudinary.js';
import slugify from 'slugify';




export const create = async (req, res) => {
  req.body.name = req.body.name.toLowerCase();

  // التحقق من وجود اسم  التصنيف  بالفعل
  if (await categoryModel.findOne({ name: req.body.name })) { 
    return res.status(409).json({ message: "category already exists" });
  }

  req.body.slug = slugify(req.body.name);

  // رفع الصورة إلى Cloudinary
  const { secure_url, public_id } = await uploadImage(req.file.path, 'ecommerce1/categories');
  req.body.image = { secure_url, public_id };
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;

  // إنشاء الفئة في قاعدة البيانات
  const category = await categoryModel.create(req.body);
  return res.json({ message: "success", category });
};

// جلب جميع الفئات (للأدمن)
export const getAll = async (req, res) => {
  const categories = await categoryModel.find({});
  return res.status(200).json({ message: "success", categories });
};

// جلب الفئات النشطة فقط (للمستخدم)
export const getActive = async (req, res) => {
  const categories = await categoryModel.find({ status: 'active' });
  return res.status(200).json({ message: "success", categories });
};

// جلب تفاصيل فئة معينة
export const getDetails = async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  return res.status(200).json({ message: "success", category });
};

// جلب اسم الفئة (حسب الطلب)
export const getName = async (req, res) => {
  const categoryName = req.params.name; // الحصول على اسم الفئة من المعامل
  return res.json({ name: categoryName }); // إرجاع اسم الفئة في استجابة JSON
};

// تحديث الفئة
export const update = async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "category not found" });
  }

  category.name = req.body.name.toLowerCase();
  if (await categoryModel.findOne({ name: req.body.name, _id: { $ne: req.params.id } })) { 
    return res.status(409).json({ message: "category name is already exists" });
  }

  category.slug = slugify(req.body.name);

  // رفع صورة جديدة إذا تم إرسال ملف جديد
  if (req.file) {
    const { secure_url, public_id } = await uploadImage(req.file.path, 'ecommerce1/categories');
    await deleteImage(category.image.public_id); // حذف الصورة السابقة
    category.image = { secure_url, public_id };
  }

  category.status = req.body.status;
  category.updatedBy = req.user._id;
  await category.save();

  return res.json({ message: "success", category });
};

// حذف فئة
export const destroy = async (req, res) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "category is not found" });
  }

  await deleteImage(category.image.public_id); // حذف الصورة من Cloudinary
  return res.status(200).json({ message: "success", category });
};