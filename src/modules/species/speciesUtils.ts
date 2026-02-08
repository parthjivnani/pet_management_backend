import Species from "./speciesModel";

export default class SpeciesUtils {
  public getSpecies = async (params?: { page?: number; limit?: number }) => {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 100;
    const skip = (page - 1) * limit;
    const match = { isDeleted: { $ne: true } };

    const [list, total] = await Promise.all([
      Species.find(match).sort({ name: 1 }).skip(skip).limit(limit).lean(),
      Species.countDocuments(match),
    ]);
    return {
      list,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  };

  public getSpeciesById = async (id: string) => {
    const species = await Species.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!species) throw new Error("Species not found");
    return species;
  };

  public createSpecies = async (body: { name: string }) => {
    const species = await Species.create(body);
    return species;
  };

  public updateSpecies = async (
    id: string,
    body?: Partial<{ name: string }>,
  ) => {
    const updates = { ...(body || {}), modifiedOn: new Date() };
    const species = await Species.findByIdAndUpdate(id, updates, { new: true });
    if (!species) throw new Error("Species not found");
    return species;
  };

  public deleteSpecies = async (id: string) => {
    const species = await Species.findByIdAndUpdate(
      id,
      { isDeleted: true, modifiedOn: new Date() },
      { new: true },
    );
    if (!species) throw new Error("Species not found");
    return species;
  };
}
