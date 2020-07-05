const { sendAccepted } = require('../../middleware');
const { sendCreated } = require('../../middleware/requests-helpers');

const create = ({ Cart }) => async (req, res, next) => {
  try {
    const cart = new Cart();
    await cart.save();

    return sendCreated(res, cart);
  } catch (error) {
    next(error);
  }
};

module.exports= { create };
