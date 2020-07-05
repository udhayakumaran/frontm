const { sendOne } = require('../../middleware');

const get = ({ Cart }) => async (req, res, next) => {
  const { cartId } = req.path;
  try {
    const cart = await Cart.find({ uuid: cartId });
    return sendOne(res, cart);
  } catch (error) {
    next(error);
  }
};

module.exports= { get };
