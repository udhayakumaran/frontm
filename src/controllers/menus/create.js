const { sendAccepted } = require('../../middleware');
const _ = require('lodash');

const create = ({ Menu }) => async (req, res, next) => {
  try {
    const menu = new Menu();
    _.extend(menu, req.body);
    await menu.save();

    return sendAccepted(res)();
  } catch (error) {
    next(error);
  }
};

module.exports= { create };
