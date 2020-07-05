const { sendAccepted } = require('../../middleware/requests-helpers');
const _ = require('lodash');
const { Inventory } = require('../../models/inventory/model');
const { BadRequest } = require('rest-api-errors');

const placeOrder = ({ Cart, Order }) => async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findOne({ cartId: cartId });

    cart.items.forEach(async (item) => {
      let invDetails = await Inventory.findOne({menuId: item['menuId']});
      if (item['quantity'] > invDetails['quantity']) {
        throw new BadRequest(400, 'Product out of stock');
      } else {
        await Inventory.updateOne(
          { menuId: item['menuId'] },
          { $inc: { quantity: item['quantity'] * -1 } }
        );
      }
    });

    const order = new Order();

    _.extend(order, {
      cartId: cart.cartId,
      items: cart.items
    });

    await order.save();
    await Cart.deleteOne({ cartId: cartId });
    
    return sendAccepted(res)();
  } catch (error) {
    next(error);
  }
};

module.exports= { placeOrder };
