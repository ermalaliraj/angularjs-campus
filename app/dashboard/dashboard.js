(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['common'];

    function Dashboard(common) {
        /*jshint validthis: true */
        var vm = this;
        var $q = common.$q;

        vm.students = {};
        vm.topics = {};
        vm.courses = {};
        vm.news = {};

        activate();

        function activate() {
            setBasicData();
            var promises = [
                getStudentsCount(),
                getTopicCount(),
                getTopics(),
                getTrackCounts()
            ];
        }

        function setBasicData() {
            vm.students = {
                title: 'Top students'
            };
            vm.topics = {
                interval: 5000,
                list: [],
                title: 'Most ranked topics'
            };
            vm.courses = {
                predicate: '',
                reverse: false,
                setSort: setCoursesSort,
                title: 'Most followed courses',
                tracks: []
            };
            vm.news = {
                title: 'Campus Angular JS',
                description: 'Campus Angular JS ' +
                'is a demo project '
            };
        }

        function setCoursesSort(prop) {
            vm.courses.predicate = prop;
            vm.courses.reverse = !vm.courses.reverse;
        }

        function getStudentsCount() {
            return 4;
        }

        function getTopicCount() {
            return 1;
        }

        function getTrackCounts() {
            return 5;
        }

        function getTopics() {
            return {};
        }
    }
})();