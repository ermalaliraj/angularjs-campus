(function () {
    'use strict';

    angular.module('app.courses')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/courses/:id',
                config: {
                    templateUrl: 'courses/coursedetail.html',
                    title: 'Course Detail',
                    settings: {}
                }
            },
            {
                url: '/courses',
                config: {
                    templateUrl: 'courses/courses.html',
                    title: 'Courses',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-calendar"></i> Courses'
                    }
                }
            }
        ];
    }
})();