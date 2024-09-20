import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { getProduct, getProductById } from '../controller/productController.js';
const router = express.Router();

router.route('/').get(getProduct);
router.route('/:id').get(getProductById);

export default router;