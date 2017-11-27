(function () {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',

        /*
         * Our reusable cross app code modules
         */
        'util.exception', 'util.logger', 'util.router',

        /*
         * 3rd Party modules
         */
        'ui.bootstrap',     // ui-bootstrap (ex: carousel, pagination, dialog)
        'ngplus'           // ngplus utilities
    ]);
})();