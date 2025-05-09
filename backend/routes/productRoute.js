import express from 'express';
import { createProduct, getProduct, getProductById, updateProduct,deleteProduct,createProductReview,getTopProducts } from '../controller/productController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/top',getTopProducts);
router.route('/').get(getProduct).post(protect,admin,createProduct);
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);

export default router;