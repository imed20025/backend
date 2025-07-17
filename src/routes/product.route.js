import express from 'express';
import productController from '../controllers/product.controller.js';
// import isAuth from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/:id', productController.getOneProduct);
router.get('/', productController.getAllProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id',  productController.deleteProduct);

export default router;
