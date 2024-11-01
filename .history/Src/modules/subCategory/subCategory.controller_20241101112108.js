

import categoryModel from '../../../DB/models/subCategory.model.js';
import{ uploadImage, deleteImage }  from '../../utils/cloudinary.js';
import slugify from 'slugify';


export const create = async (req, res) => {

    const {categoryId}=req.body;
    const category = await categoryModel.findById(categoryId);
    console.log
    if(!category){
        return res.status(404).json({message:"category not found"})
    }

return res.json(category);
}
/*
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
 // const category = await categoryModel.create(req.body);
 // return res.json({ message: "success", category });
};

/*
export const getAll = async (req, res) => {
  const categories = await categoryModel.find({});
  return res.status(200).json({ message: "success", categories });
};


export const getActive = async (req, res) => {
  const categories = await categoryModel.find({ status: 'active' });
  return res.status(200).json({ message: "success", categories });
};


export const getDetails = async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  return res.status(200).json({ message: "success", category });
};




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




  export const destroy = async (req, res) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "category is not found" });
  }

  await deleteImage(category.image.public_id); // حذف الصورة من Cloudinary
  return res.status(200).json({ message: "success", category });
};
*/