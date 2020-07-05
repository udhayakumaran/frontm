const _ = require('lodash');

const update = ({ Menu }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const menu = await Menu.findOne({ _id });
    _.extend(menu, req.body);
    await menu.save();
    res.status(200).send({ menu });
  } catch (error) {
    next(error);
  }
};

module.exports= { update };
