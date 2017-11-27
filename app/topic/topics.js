(function () {
    'use strict';

    angular
        .module('app.topic')
        .controller('Topics', Topics);

    Topics.$inject = ['$location', '$routeParams', 'common', 'config'];

    function Topics($location, $routeParams, common, config) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;
        var applyFilter = function () {};

        vm.filteredTopics = [];
        vm.gotoTopic = gotoTopic;
        vm.refresh = refresh;
        vm.search = search;
        vm.topics = [];
        vm.topicsFilter = topicsFilter;
        vm.topicsSearch = $routeParams.search || '';
        vm.title = 'Topics';

        activate();

        function activate() {
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready([getTopics()]).then(function () {
//            return getTopics().then(function () {
//                applyFilter = common.createSearchThrottle(vm, 'topics');
//                if (vm.topicsSearch) {
//                    applyFilter(true /*now*/);
//                }
//            });
        }

        function getTopics(forceRefresh) {
            return {};
        }

        function gotoTopic(topic) {
            if (topic && topic.id) {
                $location.path('/topic/' + topic.id);
            }
        }

        function refresh() {
            getTopics(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.topicsSearch = '';
                applyFilter(true /*now*/);
            } else {
                applyFilter();
            }
        }

        function topicsFilter(topic) {
            var textContains = common.textContains;
            var searchText = vm.topicsSearch;
            var isMatch = searchText ? textContains(topic.title, searchText) ||
                textContains(topic.tagsFormatted, searchText) ||
                textContains(topic.room.name, searchText) ||
                textContains(topic.track.name, searchText) ||
                textContains(topic.course.fullName, searchText) : true;
            return isMatch;
        }
    }
})();