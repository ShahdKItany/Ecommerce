import Category from '../../../';

// إنشاء فئة جديدة
export const createCategory = async (req, res) => {
    const { name, image, status } = req.body;
    const userId = req.user._id; // استخدام معرف المستخدم من التوكن

    try {
        const newCategory = new Category({
            name,
            image,
            status,
            createdBy: userId  // ربط createdBy بمعرف المستخدم
        });

        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// تحديث فئة
export const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, image, status } = req.body;
    const userId = req.user._id;  // استخدام معرف المستخدم من التوكن

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, image, status, updatedBy: userId },  // تحديث updatedBy بمعرف المستخدم
            { new: true }  // إعادة الفئة المحدثة
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// جلب الفئات مع بيانات المستخدم المرتبطة
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('createdBy', 'username email')  // جلب اسم المستخدم والبريد الإلكتروني للمستخدم الذي أنشأ الفئة
            .populate('updatedBy', 'username email'); // جلب اسم المستخدم والبريد الإلكتروني للمستخدم الذي عدل الفئة

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};
