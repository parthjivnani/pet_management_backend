import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Model } from "../../model";

export class ApplyAdoptionValidator extends Model {
  @IsNotEmpty()
  petId: string;

  @IsOptional()
  @MaxLength(500)
  message: string;

  constructor(body: any) {
    super();
    this.petId = body.petId;
    this.message = body.message ?? "";
  }
}
