import mongoose, { Schema, Document } from "mongoose";

export type AdoptionStatus = "pending" | "approved" | "rejected";

export interface IAdoption extends Document {
  pet: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: AdoptionStatus;
  message?: string;
  createdOn: Date;
  modifiedOn: Date;
}

const AdoptionSchema = new Schema<IAdoption>({
  pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  message: { type: String, default: "" },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

const Adoption = mongoose.model<IAdoption>("Adoption", AdoptionSchema);
export default Adoption;
