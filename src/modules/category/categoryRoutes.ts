import { Router } from 'express';
import { IsTokenValid } from '../../middleware/isTokenValidMiddleware';
import CategoryController from './categoryController';
import { Validator } from '../../validate';
import { CreateCategoryValidator, UpdateCategoryValidator } from './categoryValidator';

const router: Router = Router();
const categoryController = new CategoryController();
const v: Validator = new Validator();

router.get('/', IsTokenValid, categoryController.getCategories);
router.get('/tree', IsTokenValid, categoryController.getCategoryTree);
router.get('/:id', IsTokenValid, categoryController.getCategoryById);
router.post('/', v.validate(CreateCategoryValidator) ,IsTokenValid, categoryController.createCategory);
router.put('/:id',v.validate(UpdateCategoryValidator), IsTokenValid, categoryController.updateCategory);
router.delete('/:id', IsTokenValid, categoryController.deleteCategory);

const categoryRoute: Router = router;

export default categoryRoute;
