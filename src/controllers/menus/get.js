const { sendOne } = require('../../middleware');

const get = ({ Menu }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const menu = await Menu.findOne({ _id });
    return sendOne(res, menu);
  } catch (error) {
    next(error);
  }
};

module.exports= { get };
