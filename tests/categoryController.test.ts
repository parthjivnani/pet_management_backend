import { Request, Response } from 'express';
import CategoryController from '../src/modules/category/categoryController';
import CategoryUtils from '../src/modules/category/categoryUtils';

jest.mock('../src/modules/category/categoryUtils');

describe('CategoryController', () => {
    let categoryController: CategoryController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let categoryUtilsMock: jest.Mocked<CategoryUtils>;

    beforeEach(() => {
        categoryController = new CategoryController();
        categoryUtilsMock = new CategoryUtils() as jest.Mocked<CategoryUtils>;

        mockRequest = { body: {}, params: {} };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        categoryUtilsMock.getCategories = jest.fn();
        categoryUtilsMock.getCategoryById = jest.fn();
        categoryUtilsMock.createCategory = jest.fn();
        categoryUtilsMock.updateCategory = jest.fn();
        categoryUtilsMock.deleteCategory = jest.fn();
    });

    describe('getCategories', () => {
        it('should return all categories successfully', async () => {
            const mockCategories = [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }];
            categoryUtilsMock.getCategories.mockResolvedValue(mockCategories);

            await categoryController.getCategories(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);

            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                message: 'Categories fetched successfully',
                data: mockCategories
            });
        });

        it('should handle error while fetching categories', async () => {
            categoryUtilsMock.getCategories.mockRejectedValue(new Error('Database error'));

            await categoryController.getCategories(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: false,
                message: 'Internal Server Error'
            });
        });
    });

    describe('getCategoryById', () => {
        it('should return category by ID successfully', async () => {
            const mockCategory = { id: '1', name: 'Category 1' };
            mockRequest.params = { id: '1' };
            categoryUtilsMock.getCategoryById.mockResolvedValue([mockCategory]);

            await categoryController.getCategoryById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                message: 'Category fetched successfully',
                data: mockCategory
            });
        });

        it('should handle error while fetching category by ID', async () => {
            mockRequest.params = { id: '1' };
            categoryUtilsMock.getCategoryById.mockRejectedValue(new Error('Database error'));

            await categoryController.getCategoryById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });

    describe('createCategory', () => {
        it('should create a new category successfully', async () => {
            const mockCategory = { id: '1', name: 'New Category' };
            mockRequest.body = { name: 'New Category' };
            categoryUtilsMock.createCategory.mockResolvedValue(mockCategory as any);

            await categoryController.createCategory(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                message: 'Category created successfully',
                data: mockCategory
            });
        });

        it('should handle error while creating category', async () => {
            mockRequest.body = { name: 'New Category' };
            categoryUtilsMock.createCategory.mockRejectedValue(new Error('Database error'));

            await categoryController.createCategory(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });
});
