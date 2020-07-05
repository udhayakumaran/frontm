const { APIError, InternalServerError,  } = require('rest-api-errors');
const { STATUS_CODES } = require('http');
//const logger = require('../../logger');

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = (err.status === 401 ||
    err instanceof APIError) ? err : new InternalServerError();

  /* if (process.env.NODE_ENV !== 'production') {
    // todo: comment here for production
    console.log(err.name);
  } */

  switch(err.name) {
    case 'MongoError':
      if(err.code === 11000) {// Duplicate
        error = {
          status: 200,
          code: 200,
          message: "Duplicate entry cannot be created."
        };
      }
      break;
    case 'ValidationError':
      error = {
        status: 200,
        code: 200,
        message: "Invalid values for fields: " + Object.keys(err.errors).join(',')
      };
      break;
    default:
      error.message = ([400, 401].indexOf(error.status) > -1) ? error.message : "Something went wrong"; // <----- This is a hack to make all the errors to return with 200 status
      error.status = 200; // <----- This is a hack to make all the errors to return with 200 status
      break;
  }

  return res
    .status(error.status || 500)
    .json({
      status: (error.status || 500),
      message: error.message, // || STATUS_CODES[error.status],
    });
};

module.exports = { errorHandler };