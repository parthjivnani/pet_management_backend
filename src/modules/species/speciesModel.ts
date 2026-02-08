import mongoose, { Schema, Document } from "mongoose";

export interface ISpecies extends Document {
  name: string;
  isDeleted: boolean;
  createdOn: Date;
  modifiedOn: Date;
}

const SpeciesSchema = new Schema<ISpecies>({
  name: { type: String, required: true, maxlength: 100 },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

const Species = mongoose.model<ISpecies>("Species", SpeciesSchema);
export default Species;
