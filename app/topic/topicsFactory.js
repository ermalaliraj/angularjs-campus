(function () {
    'use strict';

    angular
        .module('app.topic')
        .factory('Topics', Topics);

    Topics.$inject = ['$http', 'logger'];

    function Topics($http, logger) {
        return {
            list: function(callback){
                $http({
                    method: 'GET',
                    url: 'test/stub/topics.json',
                    cache: true
                }).then(function successCallback(response) {
                    callback(response.data);
                }, function errorCallback(response) {
                    logger.error("Error calling Topics: "+response);
                });
            },
            get: function(topic, callback) {
                $http({
                    method: 'GET',
                    url: 'test/stub/topic_'+topic+'.json',
                    cache: true
                }).then(function successCallback(response) {
                    callback(response.data);
                }, function errorCallback(response) {
                    logger.error("Error calling Topics: "+response);
                });
            },
            delete: function(topic, callback) {
                console.debug("deleting from db topic " + topic);
                callback();
            }
            ,
            save: function(topic, callback) {
                console.debug("saving in db topic " + topic);
                callback();
            }
        }
    }
})();