
import Category from '../models/category.model.js';
import User from '../models/user.model.js';

// إنشاء فئة جديدة
export const createCategory = async (req, res) => {
    const { name, status } = req.body;
    const userId = req.user._id;  // من خلال middleware

    try {
        const newCategory = new Category({
            name,
            image: req.file ? req.file.path : null,
            status,
            createdBy: userId,
        });

        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// جلب جميع الفئات
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('createdBy', 'username email')
            .populate('updatedBy', 'username email');

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// جلب فئة حسب ID
export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id)
            .populate('createdBy', 'username email')
            .populate('updatedBy', 'username email');

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

// تحديث فئة
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const userId = req.user._id;  // من خلال middleware

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                name,
                image: req.file ? req.file.path : undefined,
                status,
                updatedBy: userId
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// حذف فئة
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
