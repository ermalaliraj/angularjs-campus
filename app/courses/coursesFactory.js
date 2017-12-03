(function () {
    'use strict';

    angular
        .module('app.courses')
        .factory('Courses', Courses);

    Courses.$inject = ['$http', 'logger'];

    function Courses($http, logger) {
        return {
            list: function(callback){
                $http({
                    method: 'GET',
                    url: 'test/stub/courses.json',
                    cache: true
                }).then(function successCallback(response) {
                    console.info(response);
                    callback(response.data);
                }, function errorCallback(response) {
                    logger.error("Error calling Courses: "+response);
                });
            }
        }
    }
})();