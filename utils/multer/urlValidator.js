const path = require('./paths')
let destinationFolder;
let errorMsg;

exports.checkFronturl = (url) => {
  errorMsg = "";
  
  if (url === path.PERFIL_URL) {
    destinationFolder = path.PERFIL_DEST_FOLDER;
  } else if (url === path.PUB_URL) {
    destinationFolder = path.PUB_DEST_FOLDER;
  } else {
    errorMsg = path.ERROR;
  }
};

exports.isValid = () => {
  return errorMsg === "";
};

exports.getError = () => {
  const error = new Error(errorMsg);
  error.statusCode = 404;
  return error;
};

exports.assignDestinationFolder = () => {
  return destinationFolder;
};
