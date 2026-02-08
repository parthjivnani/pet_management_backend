import mongoose, { Schema, Document } from "mongoose";

export type PetStatus = "available" | "adopted";

export interface IPet extends Document {
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
  status: PetStatus;
  isDeleted: boolean;
  createdOn: Date;
  modifiedOn: Date;
}

const PetSchema = new Schema<IPet>({
  name: { type: String, required: true, maxlength: 100 },
  species: { type: String, required: true, maxlength: 50 },
  breed: { type: String, required: true, maxlength: 50 },
  age: { type: Number, required: true, min: 0 },
  description: { type: String, default: "", maxlength: 1000 },
  imageUrl: { type: String, default: "" },
  status: {
    type: String,
    enum: ["available", "adopted"],
    default: "available",
  },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

const Pet = mongoose.model<IPet>("Pet", PetSchema);
export default Pet;
