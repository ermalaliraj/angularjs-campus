(function () {
    'use strict';

    angular
        .module('app.courses')
        .controller('Courses', Courses);

    Courses.$inject = ['$location', 'common', 'config', 'Courses'];

    function Courses($location, common, config, Courses) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;

        // Define viewmodel variables
        vm.gotoCourse = gotoCourse;
        vm.refresh = refresh;
        vm.search = search;
        vm.courseSearch = '';
        vm.courses = [];
        vm.filteredCourses = [];
        vm.title = 'Courses';

        // Kickoff functions
        activate();

        function activate() {
            return getCourses();
        }

        function applyFilter() {
            vm.filteredCourses = vm.courses.filter(courseFilter);
        }

        function getCourses() {
            Courses.list(function (courses) {
                console.debug(courses);
                vm.courses = courses;
                vm.filteredCourses = courses;
            });
            return vm.courses;
        }

        function gotoCourse(course) {
            if (course && course.id) {
                $location.path('/courses/' + course.id);
            }
        }

        function refresh() {
            getCourses();
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