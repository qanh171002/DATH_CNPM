import express from 'express';
import { SearchController } from '../controllers/SearchController';

const router = express.Router();

router.get('/', SearchController.searchProducts);

export const SearchRoutes = router;
