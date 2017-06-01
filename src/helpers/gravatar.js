var md5 = require('md5');

/**
 * Returns Gravtar image url given email address
 *
 * @param  {string} email Gravatar registered email address
 * @return {string}       Gravatar API URL with hash
 */
module.exports = function ( email, size ) {
  // Gravatar API url
  var url = 'https://www.gravatar.com/avatar/';
  // Hash email address
  var hash = md5( email.trim().toLowerCase() );

  return url + hash + '?s=' + size;
};
