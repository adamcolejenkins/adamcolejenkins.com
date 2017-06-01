module.exports = function ( h2, h3, options ) {

  // Before hgroup
  var string = '<hgroup class="section__header">\n';

  // Section Header
  string += '<h2>' + h2 + '</h2>\n';

  // Subheader
  if ( h3.length > 0 ) {
    string += '<h3 class="subheader">' + h3 + '</h3>\n';
  }

  // After hgroup
  string += '</hgroup>';

  return string;
};
