
const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res) => {
 //let errorCode = httpStatus.NOT_FOUND;
 let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
 res.status(errorCode);
 res.sendFile(`/${errorCode}.html`, {
 root: "./"
 });
};

exports.logErrors = (error, req, res, next) => {
 console.error(error.stack);
 next(error);
};



exports.respondInternalError = (error, req, res, next) => {
 let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
 console.log(`ERROR occurred: ${error.stack}`)
 res.status(errorCode);
 res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
