import mongoose from "mongoose";
import Adoption from "./adoptionModel";
import Pet from "../pet/petModel";

export default class AdoptionUtils {
  public apply = async (userId: string, petId: string, message?: string) => {
    const pet = await Pet.findOne({
      _id: petId,
      isDeleted: { $ne: true },
      status: "available",
    });
    if (!pet) throw new Error("PET_NOT_AVAILABLE");
    const existing = await Adoption.findOne({
      pet: petId,
      user: userId,
      status: "pending",
    });
    if (existing) throw new Error("ALREADY_APPLIED");
    const adoption = await Adoption.create({
      pet: petId,
      user: userId,
      message: message || "",
    });
    return adoption.populate(["pet", "user"]);
  };

  public getByUser = async (userId: string) => {
    const list = await Adoption.find({ user: userId })
      .populate("pet")
      .sort({ createdOn: -1 })
      .lean();
    return list;
  };

  public getAll = async (params: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const { page = 1, limit = 20, status } = params;
    const skip = (page - 1) * limit;
    const match: Record<string, unknown> = {};
    if (status) match.status = status;
    const [list, total] = await Promise.all([
      Adoption.find(match)
        .populate("pet")
        .populate("user", "firstName lastName email")
        .sort({ createdOn: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Adoption.countDocuments(match),
    ]);
    return { list, total, page, limit, totalPages: Math.ceil(total / limit) };
  };

  public getById = async (id: string) => {
    const adoption = await Adoption.findById(id)
      .populate("pet")
      .populate("user", "firstName lastName email");
    if (!adoption) throw new Error("ADOPTION_NOT_FOUND");
    return adoption;
  };

  public approve = async (id: string) => {
    const adoption = await Adoption.findByIdAndUpdate(
      id,
      { status: "approved", modifiedOn: new Date() },
      { new: true },
    ).populate(["pet", "user"]);
    if (!adoption) throw new Error("ADOPTION_NOT_FOUND");
    await Pet.findByIdAndUpdate(adoption.pet, {
      status: "adopted",
      modifiedOn: new Date(),
    });
    return adoption;
  };

  public reject = async (id: string) => {
    const adoption = await Adoption.findByIdAndUpdate(
      id,
      { status: "rejected", modifiedOn: new Date() },
      { new: true },
    ).populate(["pet", "user"]);
    if (!adoption) throw new Error("ADOPTION_NOT_FOUND");
    return adoption;
  };
}
