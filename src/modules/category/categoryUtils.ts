import mongoose from "mongoose";
import Category from "./categoryModel";

export default class CategoryUtils {
    public getCategories = async () => {
        const categories = await Category.aggregate([
            {
                $match: {
                    isDeleted: { $ne: true }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "parentCategory",
                    foreignField: "_id", 
                    as: "parentCategoryDetails"
                }
            },
            {
                $unwind: {
                    path: "$parentCategoryDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
        ]);
        return categories;
    }

    public getCategoryTree = async () => {
        // Get all categories that aren't deleted
        const categories = await Category.find({ isDeleted: { $ne: true } });
        
        // Helper function to build tree recursively
        const buildTree = (parentId: mongoose.Types.ObjectId | null = null) => {
            return categories
                .filter(cat => 
                    parentId === null 
                        ? !cat.parentCategory
                        : cat.parentCategory?.toString() === parentId.toString()
                )
                .map(cat => ({
                    _id: cat._id,
                    name: cat.name,
                    isActive: cat.isActive,
                    isDeleted: cat.isDeleted,
                    createdOn: cat.createdOn,
                    modifiedOn: cat.modifiedOn,
                    parentCategory: cat.parentCategory,
                    children: buildTree(cat._id as mongoose.Types.ObjectId)
                }));
        };

        // Build tree starting from root categories (no parent)
        const categoryTree = buildTree();
        return categoryTree;
    }
    

    public getCategoryById = async (id: string) => {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error();
        }
        const categoryDetails = await Category.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "parentCategory",
                    foreignField: "_id", 
                    as: "parentCategoryDetails"
                }
            },
            {
                $unwind: {
                    path: "$parentCategoryDetails",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
        return categoryDetails;
    }

    public createCategory = async (body: any) => {
        const { name, parentCategory, status } = body;
        const category = await Category.create({ name, parentCategory, isActive: status });
        return category;
    }

    public updateCategory = async (id: string, body: any) => {
        const { name, parentCategory, status } = body;
        const category = await Category.findByIdAndUpdate(id, { name, parentCategory, isActive: status }, { new: true });
        // If category is being marked as inactive, update all child categories
        if (status === false) {
            await Category.updateMany(
                { parentCategory: id },
                { isActive: false }
            );
        }
        return category;
    }

    public deleteCategory = async (id: string) => {
        // Find the category to be deleted
        const category = await Category.findById(id);
        if (!category) {
            throw new Error();
        }

        // Find all child categories that have this category as parent
        const childCategories = await Category.find({ parentCategory: id });

        // Update children to have the same parent as the deleted category
        if (childCategories.length > 0) {
            await Category.updateMany(
                { parentCategory: id },
                { parentCategory: category.parentCategory }
            );
        }

        // Soft delete the category
        const deletedCategory = await Category.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );

        return deletedCategory;
    }
}

