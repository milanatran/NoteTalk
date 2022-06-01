
const httpStatus = require("http-status-codes");

module.exports = {
  respondNoResourceFound: (req, res) => {
   let errorCode = httpStatus.NOT_FOUND;
   res.status(errorCode);
   res.sendFile(`./public/${errorCode}.html`, {
   root: "./"
   });
  },

  logErrors: (error, req, res, next) => {
   console.error(error.stack);
   next(error);
  },

  respondInternalError: (error, req, res, next) => {
   let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
   console.log(`ERROR occurred: ${error.stack}`)

   res.sendFile(`./public/${errorCode}.html`, {
   root: "./"
   });
  }
}
