(function () {
    'use strict';

    angular
        .module('app.students')
        .factory('Students', Students);

    Students.$inject = ['$http', 'logger'];

    function Students($http, logger) {
        return {
            list: function (pageStart, pageSize, callback) {
                $http({
                    method: 'GET',
                    url: 'test/stub/students.json',
                    cache: true
                }).then(function successCallback(response) {
                    console.log("page: "+pageStart+", pageSize: "+pageSize+", BUT for demo purpose we slice array from-to. StartElem: " + (pageStart) + ", EndElem: " + (pageStart+pageSize));
                    var arr = response.data;
                    callback(arr.slice(pageStart, pageStart+pageSize));
                }, function errorCallback(response) {
                    logger.error("Error calling Students: " + response);
                });
            }, count: function (callback) {
                $http({
                    method: 'GET',
                    url: 'test/stub/students.json',
                    cache: true
                }).then(function successCallback(response) {
                    callback(response.data.length);
                }, function errorCallback(response) {
                    logger.error("Error calling Students: " + response);
                });
            }
        }
    }
})();