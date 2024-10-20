import Category from '../../../';

// إنشاء فئة
export const createCategory = async (req, res) => {
    try {
        const { name, image, status } = req.body;
        const newCategory = new Category({
            name,
            image,
            status,
            createdBy: req.user._id
        });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// عرض جميع الفئات
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('createdBy updatedBy');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// جلب فئة واحدة عبر ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('createdBy updatedBy');
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
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedBy: req.user._id },
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
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
