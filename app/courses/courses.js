(function () {
    'use strict';

    angular
        .module('app.courses')
        .controller('Courses', Courses);

    Courses.$inject = ['$location', 'common', 'config'];

    function Courses($location, common, config) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;

        // Define viewmodel variables
        vm.filteredCourses = [];
        vm.gotoCourse = gotoCourse;
        vm.refresh = refresh;
        vm.search = search;
        vm.courseSearch = '';
        vm.courses = [];
        vm.title = 'Courses';

        // Kickoff functions
        activate();

        function activate() {
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready([getCourses()]);
            return getCourses();
        }

        function applyFilter() {
            vm.filteredCourses = vm.courses.filter(courseFilter);
        }

        function getCourses(forceRefresh) {
            return {};
        }

        function gotoCourse(course) {
            if (course && course.id) {
                $location.path('/courses/' + course.id);
            }
        }

        function refresh() {
            getCourses(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.courseSearch = '';
            }
            applyFilter();
        }

        function courseFilter(course) {
            var isMatch = vm.courseSearch ? common.textContains(course.fullName, vm.courseSearch) : true;
            //if (isMatch) { vm.filteredCount++; }
            return isMatch;
        }
    }
})();