import { insertSingleRow2, updateRow2, getOne2, deleteRow2, getAll2, executeQuery } from '~/database/query';
import { v4 as uuidv4 } from 'uuid';

async function getCartIDbyBuyerID(buyer_id) {
  try {
    const cart = await getOne2('carts', { buyer_id: buyer_id });
    return cart || null;
  } catch (error) {
    throw new Error(`Faild to get cart by buyer_id: ${buyer_id} - ${error.message}`);
  }
}

async function createCart(buyer_id) {
  const newCartData = { id: `${uuidv4()}`, buyer_id };
  return await insertSingleRow2('carts', newCartData);
}

async function getProductInCart(cart_id, product_id) {
  const rows = await getOne2('cart_product', { cart_id, product_id });
  return rows;
}

async function addProductToCart(cart_id, product_id, quantity) {
  const data = { cart_id, product_id, quantity };
  return await insertSingleRow2('cart_product', data);
}

async function updateProductQuantity(cart_id, product_id, quantity) {
  const data = { quantity };
  const where = { cart_id, product_id };
  return await updateRow2('cart_product', data, where);
}

async function removeProductFromCart(cart_id, product_id) {
  const where = { cart_id, product_id };
  return await deleteRow2('cart_product', where);
}

async function getProductsInCart(cart_id) {
  try {
    const rows = await getAll2('cart_product', { cart_id });

    for (const row of rows) {
      const productDetails = await getAll2('products', { id: row.product_id });
      row.price = productDetails[0].price;
    }
    return rows;
  } catch (error) {
    throw new Error(`Failed to get products in cart: ${error.message}`);
  }
}

async function getProductInCart2(cartId) {
  const query = `
    SELECT 
        p.id,
        p.name,
        p.image,
        p.price,
        cp.quantity,
        cp.checked,
        s.name AS shopName,
        s.id AS shopId,
        c.name AS category
    FROM 
        cart_product cp
    JOIN 
        products p ON cp.product_id = p.id
    JOIN 
        users s ON p.seller_id = s.id
    LEFT JOIN 
        categories c ON p.category_id = c.id
    WHERE 
        cp.cart_id = '${cartId}';
  `;

  const products = await executeQuery(query);

  return products;
}

async function updateProductCheckedStatus(cart_id, product_id, checked) {
  const data = { checked };
  const where = { cart_id, product_id };

  return await updateRow2('cart_product', data, where);
}

export const CartModel = {
  createCart,
  getCartIDbyBuyerID,
  getProductInCart,
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  getProductsInCart,
  getProductInCart2,
  updateProductCheckedStatus
};
