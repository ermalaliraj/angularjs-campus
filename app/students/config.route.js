(function() {
    'use strict';

    angular
        .module('app.students')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/students',
                config: {
                    templateUrl: 'students/students.html',
                    title: 'Students',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-group"></i> Students'
                    }
                }
            }
        ];
    }
})();