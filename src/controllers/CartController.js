import { CartModel } from "~/models/CartModel";
import { StatusCodes } from "http-status-codes";

async function getCart(req, res) {
  try {
    const cart = await CartModel.getCart(req.params.buyer_id);
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function addProduct(req, res) {
  try {
    const { buyer_id, product_id, quantity } = req.body;
    await CartModel.addProductToCart(buyer_id, product_id, quantity);
    res.status(StatusCodes.CREATED).json("Product added to cart");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}


async function updateQuantity(req, res) {
  try {
    const { buyer_id, product_id, quantity } = req.body;
    await CartModel.updateQuantity(buyer_id, product_id, quantity);
    res.status(StatusCodes.OK).json({ message: "Quantity updated" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

async function removeProduct(req, res) {
  try {
    const { buyer_id, product_id } = req.body;
    await CartModel.removeProductFromCart(buyer_id, product_id);
    res.status(StatusCodes.OK).json("Product removed from cart");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function getTotal(req, res) {
  try {
    const total = await CartModel.getTotal(req.params.buyer_id);
    res.status(StatusCodes.OK).json({ total });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

export const CartController = {
  getCart,
  addProduct,
  updateQuantity,
  removeProduct,
  getTotal
};
