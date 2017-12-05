(function () {
    'use strict';

    angular
        .module('app.courses')
        .controller('Courses', Courses);

    Courses.$inject = ['$location', 'bootstrap.dialog', 'common', 'config', 'Courses'];

    function Courses($location, bsDialog, common, config, Courses) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;

        vm.deleteCourse = deleteCourse;
        vm.gotoCourse = gotoCourse;
        vm.refresh = refresh;
        vm.search = search;
        vm.courseSearch = '';
        vm.courses = [];
        vm.courseSelected = {};
        vm.filteredCourses = [];
        vm.title = 'Courses';

        vm.tableParams = null;


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
                console.debug("getCourses:" + courses);
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

        function deleteCourse(course) {
            return bsDialog.deleteDialog("Are you sure you want to delete the course '" + course.name + "'")
                .then(confirmDelete).catch(cancelDelete);

            function confirmDelete() {
                vm.courseSelected = course;
                //datacontext.zStorage.clear();
            }

            function cancelDelete() {
            }
        }
    }
})();