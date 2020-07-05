const _ = require('lodash');

const remove = ({ Menu }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const menu = await Menu.findOne({ _id });
    await Menu.remove({ _id });
    res.status(200).send({ menu });
  } catch (error) {
    next(error);
  }
};

module.exports= { remove };
