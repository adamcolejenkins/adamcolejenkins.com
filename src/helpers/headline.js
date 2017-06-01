module.exports = function ( words, options ) {
  // Intro
  var string = options.fn( this ) + '\n';

  // Animation container
  string += '<span data-headline></span>\n';

  // Before Words
  string += '<span data-headline-words>\n';

  for (var i = 0; i < words.length; i++) {
    string += '<p>' + words[i] + '</p>\n';
  }

  // After words
  string += '</span>\n';

  return string;
};
