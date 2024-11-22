import express from "express";
import { CartController } from "~/controllers/CartController";

const router = express.Router();

router.get("/:buyer_id", CartController.getCart);
router.post("/add", CartController.addProduct);
router.put("/update-quantity", CartController.updateQuantity);
router.delete("/remove", CartController.removeProduct);
router.get("/total/:buyer_id", CartController.getTotal);

export const CartRoutes = router;
