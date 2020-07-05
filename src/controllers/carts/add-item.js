const { sendAccepted } = require('../../middleware/requests-helpers');
const { BadRequest } = require('rest-api-errors');

const addItem = ({ Cart }) => async (req, res, next) => {
  const { cartId } = req.params;
  const { itemId, quantity } = req.body;

  try {
    let invDetails = await Inventory.findOne({menuId: itemId});
    if (quantity > invDetails['quantity']) {
      throw new BadRequest(400, 'Product out of stock');
    }

    if(quantity == 0) {
      await Cart.updateOne(
        { cartId: cartId },
        { $pull: { items: { menuId: itemId } } }
      );
    } else {
      await Cart.updateOne(
        { cartId: cartId },
        { $pull: { items: { menuId: itemId } } }
      );
      await Cart.updateOne(
        { cartId: cartId },
        { $push: { items: { menuId: itemId, quantity: quantity } } }
      );
    }
    return sendAccepted(res)();
  } catch (error) {
    next(error);
  }
};

module.exports= { addItem };
