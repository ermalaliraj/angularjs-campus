(function() {
    'use strict';

    angular
        .module('app.topic')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/topics',
                config: {
                    title: 'Topics',
                    templateUrl: 'topic/topics.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-pencil-square-o"></i> Topics'
                    }
                }
            },
            {
                url: '/topics/search/:search',
                config: {
                    title: 'topics-search',
                    templateUrl: 'topic/topics.html',
                    settings: {}
                }
            },
            {
                url: '/topic/:id',
                config: {
                    templateUrl: 'topic/topicdetail.html',
                    title: 'Topic Detail',
                    settings: {}
                }
            }
        ];
    }
})();