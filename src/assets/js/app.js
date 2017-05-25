'use strict';

!function ( $ ) {

  /**
   * Attach app as a Foundation Plugin
   *
   * @module foundation.app
   */
  class App {

    /**
     * Creates an instance of the application
     * @class
     * @param  {jQuery} app jQuery object to attach to
     * @param  {Object} options Options object passed when creating programmatically
     */
    constructor( element, options ) {
      this.$element = element;
      this.options = $.extend( {}, App.defaults, this.$element.data(), options );

      this._init();

      Foundation.registerPlugin( this, 'App' );

      // Debug
      console.log( this );
    }

    /**
     * Initializes the application scripts
     * @function
     * @private
     */
    _init() {

      // Typing animation for headline
      this.startTypedHeadline();

    }

    startTypedHeadline() {

      if ( 'function' !== typeof $.fn.typed ) {
        return;
      }

      const $headlines = this.$element.find( '[data-headline]' );
      const options = this.options.headline;

      $headlines.each( function () {
        const $headline = $( this );
        const $strings = $headline.next( '[data-headline-words]' );

        // Hide the strings container
        $strings.hide();

        // Set the headline intro to block
        $headline.prev( '.intro' ).css( 'display', 'block' );

        $headline.typed( $.extend( {}, options, {
          stringsElement: $strings
        } ) );
      } );
    }

  }

  /**
   * Application defaults
   *
   * @type {Object}
   */
  App.defaults = {

    /**
     * Typed plugin options
     * @type {Object}
     */
    headline: {

      /**
       * Loop animation
       * @type {Boolean}
       */
      loop: true,

      /**
       * Loop count, null = inifinite
       * @type {Number}
       */
      loopCount: 10,

      /**
       * Speed of typing animation
       * @type {Number}
       */
      typeSpeed: 50,

      /**
       * Time before backspacing
       * @type {Number}
       */
      backDelay: 700,

    }

  }

  /**
   * Window Exports
   */
  Foundation.plugin( App, 'App' );

}( jQuery );


// Initialize Foundation
// This must be after any custom Foundation Plugins
$( document ).foundation();
