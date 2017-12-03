(function () {
    'use strict';

    angular
        .module('app.topic')
        .controller('TopicsController', TopicsController);

    TopicsController.$inject = ['$location', '$routeParams', 'common', 'config', 'Topics'];

    function TopicsController($location, $routeParams, common, config, Topics) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;

        vm.filteredTopics = [];
        vm.gotoTopic = gotoTopic;
        vm.refresh = refresh;
        vm.search = search;
        vm.topics = getTopics();
        vm.topicsFilter = topicsFilter;
        vm.topicsSearch = $routeParams.search || '';
        vm.title = 'Topics';

        function getTopics() {
            Topics.list(function (topics) {
                console.debug(topics);
                vm.topics = topics;
                vm.filteredTopics = topics;
            });
            return vm.topics;
        }

        function gotoTopic(topic) {
            if (topic && topic.id) {
                $location.path('/topic/' + topic.id);
            }
        }

        function refresh() {
            vm.topicsSearch = '';
            getTopics();
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.topicsSearch = '';
                applyFilter(true /*now*/);
            }
            applyFilter();
        }

        function applyFilter() {
            vm.filteredTopics = vm.topics.filter(topicsFilter);
        }

        function topicsFilter(topic) {
            var isMatch = vm.topicsSearch ? common.textContains(topic.name, vm.topicsSearch) : true;
            //if (isMatch) { vm.filteredCount++; }
            return isMatch;
        }
    }
})();