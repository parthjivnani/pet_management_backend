import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  isPasswordReset: boolean;
  createdOn: Date;
  modifiedOn: Date;
}

const UserSchema = new Schema<IUser>({

  firstName: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    maxlength: 200
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isPasswordReset: {
    type: Boolean,
    default: false
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
