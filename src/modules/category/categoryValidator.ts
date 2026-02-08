import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Model } from "../../model";

export class CreateCategoryValidator extends Model {
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsOptional()
    parentCategory: string;

    @IsNotEmpty()
    status: boolean;

    constructor(body: any) {
        super();
        const { name, parentCategory, status } = body;

        this.name = body.name;
        this.parentCategory = body.parentCategory;
        this.status = body.status;
    }
}

export class UpdateCategoryValidator extends Model {
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
    
    @IsOptional()
    parentCategory: string;

    @IsNotEmpty()
    status: boolean;
    
    constructor(body: any) {
        super();
        const { name, parentCategory, status } = body;

        this.name = body.name;
        this.parentCategory = body.parentCategory;
        this.status = body.status;
    }
}


