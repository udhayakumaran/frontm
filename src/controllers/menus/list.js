const _ = require('lodash');
const { sendList } = require('../../middleware');

const list = ({ Menu }) => async (req, res, next) => {
  let { limit, skip, search, sort } = req.query;
  skip = skip ? parseInt(skip, 10) : 0;
  limit = limit ? parseInt(limit, 10) : 100;
  sort = (sort === 'asc') ? 1 : -1;

  try {
    const query = {};
    if (search) {
      _.extend(query, { name: new RegExp(`${search}`, 'i') })
    }
    const menus = await Menu.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ name: sort });

    return sendList(res, menus);
  } catch (error) {
    next(error);
  }
};

module.exports= { list };
