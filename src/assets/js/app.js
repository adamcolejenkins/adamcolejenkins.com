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
    }

    /**
     * Initializes the application scripts
     * @function
     * @private
     */
    _init() {

      this._events();

      // Typing animation for headline
      this.startTypedHeadline();

      // Logo
      this.paintLogos();

      // Create skills dots for resume
      this.resumeSkillDots();

      // Initialize print function
      this.bindPrint();

    }

    _events() {
      $( window ).load( this._resizeHero ).resize( this._resizeHero );
    }

    _resizeHero() {
      $( '#fullscreen-hero' ).height( $(window).height() );
    }

    resumeSkillDots() {

      // Get canvases
      const $skillCanvases = this.$element.find( '[data-level]' );
      const canvasClass = 'skill-level__meter-dots';

      $skillCanvases.each( function () {

        const $this       = $( this );
        const canvas      = Snap( this );
        const maxLevel    = 5;
        const strokeWidth = 2;

        // Set dimensions
        const width  = $this.attr( 'width' );
        const height = $this.attr( 'height' );
        const level  = $this.data( 'level' );

        // Set canvas attributes
        canvas.attr( {
          class:   canvasClass,
          viewBox: `0 0 ${width} ${height}`,
        } );

        // Create dots
        for (var i = 1; i <= maxLevel; i++) {

          let cr = ( height - ( strokeWidth * 2 ) ) / 2;
          let cy = cr + strokeWidth;
          let cx = ( ( ( width - ( strokeWidth * 2 ) ) / maxLevel ) * i ) - cr;
          let filled = ( i <= level );

          // Draw circle
          let dot = canvas.circle( cx, cy, cr );

          // Set fill and stroke
          dot.attr( {
            strokeWidth: strokeWidth,
            class: `${canvasClass}--` + (( filled ) ? 'filled' : 'empty'),
          } );

        }

      } );

    }

    bindPrint() {

      const $print = this.$element.find( '[data-print]' );

      $print.click( () => {
        window.print();
      } );

    }

    paintLogos() {

      // Find logos
      this.$logos = this.$element.find( '[data-logo]' );

      // Add logo to each canvas
      this.$logos.each( function () {

        const $this = $( this );

        // Wrap element into Snap struction
        const canvas = Snap( this );
        const color = $this.data( 'color' );
        const source = $this.data( 'logo' );

        // Set image to responsive
        const width = $this.attr( 'width' );
        const height = $this.attr( 'height' );
        canvas.attr( { viewBox: `0 0 ${width} ${height}` } );

        // Set up a group
        const group = canvas.group();

        Snap.load( source, loadedFragment => {

          // Append loaded image to group
          group.append( loadedFragment );

          // Select all paths within the image (should be one)
          group.selectAll( 'path' ).forEach( function ( $el ) {

            // Set fill to data-color
            $el.attr( { 'fill' : color } );

          } );
        } );

      } );

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

    styles: {

      primaryColor: '#db8c6e',
      secondaryColor: '#2d3a3e',

    },

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


!function ( $ ) {

  class SkillBar {

    /**
     * Attach SkillBar as a Foundation Plugin
     *
     * @module foundation.skillbar
     */
    constructor( element, options ) {
      this.$element = element;
      this.options = $.extend( {}, SkillBar.defaults, this.$element.data(), options );

      if ( 'function' !== typeof Snap ){
        console.warn( 'Snap.svg not installed' );
        return;
      }

      this._init();

      Foundation.registerPlugin( this, 'SkillBar' );

      // Debug
      // console.log( this );
    }

    /**
     * Initialize the Skillbar
     * @return {[type]} [description]
     */
    _init() {

      // Initialize Snap element
      this._createCanvas();

      // Load SVG element
      this._loadGraphicIntoCanvas();
    }

    /**
     * Set up canvas, make responsive and create a group
     *
     * @function
     * @private
     * @requires Snap.svg
     */
    _createCanvas() {

      // Wrap element into Snap struction
      this.canvas = Snap( '#' + this.$element.attr( 'id' ) );

      // Set image to responsive
      const width = this.options.width;
      const height = this.options.height;
      this.canvas.attr( { viewBox: `0 0 ${width} ${height}` } );

      // Set up a group
      this.group = this.canvas.group();

    }

    /**
     * Load SVG image and append to canvas
     *
     * @function
     * @private
     * @requires Snap.dvg
     */
    _loadGraphicIntoCanvas() {

      this.SkillBar = Snap.load( this.options.skillBar, loadedFragment => {
        // console.log(loadedFragment);

        this.group.append( loadedFragment );
      } );

    }

  }

  /**
   * SkillBar defaults
   * @type {Object}
   */
  SkillBar.defaults = {

    /**
     * Default width of canvas
     * @type {Number}
     */
    width: 800,

    /**
     * Default height of canvas
     * @type {Number}
     */
    height: 600,

  }

  /**
   * Window Exports
   */
  Foundation.plugin( SkillBar, 'SkillBar' );

}( jQuery );


// Initialize Foundation
// This must be after any custom Foundation Plugins
$( document ).foundation();
