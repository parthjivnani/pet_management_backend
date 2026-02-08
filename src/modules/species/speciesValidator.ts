import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Model } from "../../model";

export class CreateSpeciesValidator extends Model {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  constructor(body: { name?: string }) {
    super();
    this.name = body.name ?? "";
  }
}

export class UpdateSpeciesValidator extends Model {
  @IsOptional()
  @MaxLength(100)
  name: string;

  constructor(body: { name?: string }) {
    super();
    this.name = body.name;
  }
}
