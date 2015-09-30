// Setup
// the shim and path config here needs to me mirrored in
// the requirejs grunt task to get prod working.
require.config( {

    baseUrl: '../',

    shim: {
        bootstrap: {
            deps: [ 'jquery' ],
            exports: 'bootstrap'
        }
    },

    paths: {
        'bootstrap' : 'bower_modules/sass-bootstrap/dist/js/bootstrap',
        'jquery'    : 'bower_modules/jquery/jquery'
    }

} );


define( [ 'jquery', 'bootstrap' ], function( ) { } );
