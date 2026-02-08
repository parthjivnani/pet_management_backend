import mongoose from "mongoose";
import Pet from "./petModel";

export default class PetUtils {
  public getPets = async (params: {
    page?: number;
    limit?: number;
    search?: string;
    species?: string;
    breed?: string;
    ageMin?: number;
    ageMax?: number;
    status?: string;
  }) => {
    const {
      page = 1,
      limit = 10,
      search,
      species,
      breed,
      ageMin,
      ageMax,
      status,
    } = params;
    const skip = (page - 1) * limit;
    const match: Record<string, unknown> = { isDeleted: { $ne: true } };
    if (status === "all") {
      // no status filter
    } else if (status) {
      match.status = status;
    } else {
      match.status = "Available";
    }
    if (species) match.species = new RegExp(species, "i");
    if (breed) match.breed = new RegExp(breed, "i");
    if (search) {
      match.$or = [
        { name: new RegExp(search, "i") },
        { breed: new RegExp(search, "i") },
      ];
    }
    if (ageMin != null) match.age = { ...(match.age as object), $gte: ageMin };
    if (ageMax != null) match.age = { ...(match.age as object), $lte: ageMax };

    const [list, total] = await Promise.all([
      Pet.find(match).sort({ createdOn: -1 }).skip(skip).limit(limit).lean(),
      Pet.countDocuments(match),
    ]);
    return { list, total, page, limit, totalPages: Math.ceil(total / limit) };
  };

  public getPetById = async (id: string) => {
    const pet = await Pet.findOne({ _id: id, isDeleted: { $ne: true } });
    if (!pet) throw new Error("Pet not found");
    return pet;
  };

  public createPet = async (body: {
    name: string;
    species: string;
    breed: string;
    age: number;
    description?: string;
    imageUrl?: string;
    status?: string;
  }) => {
    const pet = await Pet.create(body);
    return pet;
  };

  public updatePet = async (
    id: string,
    body?: Partial<{
      name: string;
      species: string;
      breed: string;
      age: number;
      description: string;
      imageUrl: string;
      status: string;
    }>,
  ) => {
    const updates = { ...(body || {}), modifiedOn: new Date() };
    const pet = await Pet.findByIdAndUpdate(id, updates, { new: true });
    if (!pet) throw new Error("Pet not found");
    return pet;
  };

  public deletePet = async (id: string) => {
    const pet = await Pet.findByIdAndUpdate(
      id,
      { isDeleted: true, modifiedOn: new Date() },
      { new: true },
    );
    if (!pet) throw new Error("Pet not found");
    return pet;
  };
}
