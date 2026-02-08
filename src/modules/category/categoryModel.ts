import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
    name: string;
    parentCategory: Schema.Types.ObjectId;
    isActive: boolean;
    isDeleted: boolean;
    createdOn: Date;
    modifiedOn: Date;
}

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
