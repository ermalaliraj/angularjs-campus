(function () {
    'use strict';

    angular
        .module('app.students')
        .factory('Students', Students);

    Students.$inject = ['$http', 'logger'];

    function Students($http, logger) {
        return {
            list: function(callback){
                $http({
                    method: 'GET',
                    url: 'test/stub/students.json',
                    cache: true
                }).then(function successCallback(response) {
//                    console.info(response);
                    callback(response.data);
                }, function errorCallback(response) {
                    logger.error("Error calling Students: "+response);
                });
            }
        }
    }
})();