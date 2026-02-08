import CONSTANTS from "../../helpers/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import CategoryUtils from "./categoryUtils";
import { Request, Response } from "express";
const {
    MESSAGES: {
        INTERNAL_SERVER,
        OK,
        CREATED,
        FORBIDDEN,
        INTERNAL_SERVER_ERROR_CODE,
        CATEGORY_CREATED_SUCCESSFULLY,
        CATEGORY_FETCHED_SUCCESSFULLY,
        CATEGORY_NOT_FOUND,
        CATEGORY_UPDATED_SUCCESSFULLY,
        CATEGORY_DELETED_SUCCESSFULLY,
    }
} = CONSTANTS;

export default class CategoryController {
    private categoryService: CategoryUtils;
    private responseBuilder: ResponseBuilder;

    constructor() {
        this.categoryService = new CategoryUtils();
        this.responseBuilder = new ResponseBuilder();
    }
    /**
         * Get all categories
         * @param req 
         * @param res
         * @returns
         * @description Get all categories
         */
    public getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getCategories();
            return this.responseBuilder.responseContent(res, OK, true, CATEGORY_FETCHED_SUCCESSFULLY, categories);
        } catch (error) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
        }
    }
    /**
     * Get category tree
     * @param req 
     * @param res
     * @returns
     * @description Get category tree
     */
    public getCategoryTree = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getCategoryTree();
            return this.responseBuilder.responseContent(res, OK, true, CATEGORY_FETCHED_SUCCESSFULLY, categories);
        } catch (error) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
        }
    }
    /**
     * Get category by id
     * @param req 
     * @param res
        * @returns
     * @description Get category by id
     */
    public getCategoryById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.getCategoryById(id);
            return this.responseBuilder.responseContent(res, OK, true, CATEGORY_FETCHED_SUCCESSFULLY, category[0]);
        } catch (error) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, CATEGORY_NOT_FOUND);
        }
    }
    /**
     * Create category
     * @param req 
     * @param res
     * @returns
     * @description Create category
     */
    public createCategory = async (req: Request, res: Response) => {
        try {
            const { body } = req;
            const category = await this.categoryService.createCategory(body);
            return this.responseBuilder.responseContent(res, 200, true, CATEGORY_CREATED_SUCCESSFULLY, category);
        } catch (error) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
        }
    }
    /**
     * Update category
     * @param req 
     * @param res
     * @returns
     * @description Update category
     */
    public updateCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const category = await this.categoryService.updateCategory(id, body);
            return this.responseBuilder.responseContent(res, OK, true, CATEGORY_UPDATED_SUCCESSFULLY, category);
        } catch (error) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
        }
    }

    /**
     * Delete category
     * @param req 
     * @param res
     * @returns
     * @description Delete category
     */
    public deleteCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.deleteCategory(id);
            return this.responseBuilder.responseContent(res, OK, true, CATEGORY_DELETED_SUCCESSFULLY, category);
        } catch (error) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, CATEGORY_NOT_FOUND);
        }
    }
}
