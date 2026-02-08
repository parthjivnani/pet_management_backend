import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { Model } from "../../model";

export class CreatePetValidator extends Model {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MaxLength(50)
  species: string;

  @IsNotEmpty()
  @MaxLength(50)
  breed: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  age: number;

  @IsOptional()
  @MaxLength(1000)
  description: string;

  constructor(body: any) {
    super();
    this.name = body.name;
    this.species = body.species;
    this.breed = body.breed;
    this.age = body.age != null ? Number(body.age) : body.age;
    this.description = body.description ?? "";
  }
}

export class UpdatePetValidator extends Model {
  @IsOptional()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @MaxLength(50)
  species: string;

  @IsOptional()
  @MaxLength(50)
  breed: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  age: number;

  @IsOptional()
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  status: string;

  constructor(body: any) {
    super();
    this.name = body.name;
    this.species = body.species;
    this.breed = body.breed;
    this.age =
      body.age !== undefined && body.age !== "" ? Number(body.age) : undefined;
    this.description = body.description;
    this.imageUrl = body.imageUrl;
    this.status = body.status;
  }
}
