(function () {
    'use strict';

    angular
        .module('app.students')
        .controller('StudentsController', StudentsController);

    StudentsController.$inject = ['config', 'common', 'Students'];

    function StudentsController(config, common, Students) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;

        vm.studentsCount = 0;
        vm.studentsFilteredCount = 0;
        vm.studentsSearch = '';
        vm.students = [];
        vm.filteredStudents = [];
        vm.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 15
        };
        vm.pageChanged = pageChanged;
        vm.refresh = refresh;
        vm.search = search;
        vm.title = 'Students';

        Object.defineProperty(vm.paging, 'pageCount', {
            get: function () {
                var val = 1;
    
                if (vm.studentsFilteredCount % vm.paging.pageSize == 0)
                    val = 0;
    
                return Math.floor(vm.studentsFilteredCount / vm.paging.pageSize) + val;
            }
        });

        activate();

        function activate() {
            return getStudents();
        }

        function getStudents() {
            Students.list(function (students) {
               // console.debug(students);
                vm.students = students;
                vm.filteredStudents = students;
                getStudentsCount();
                getStudentsFilteredCount();
            });
            return vm.students;
        }

        function getStudentsCount() {
            vm.studentsCount = vm.students.length;
        }

        function getStudentsFilteredCount() {
            vm.studentsFilteredCount = vm.filteredStudents.length;
        }

        function pageChanged() {
            getStudents();
        }

        function refresh() {
            return getStudents(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.studentsSearch = '';
            }
            vm.filteredStudents = vm.students.filter(studentsFilter);
            getStudentsFilteredCount();
        }
        function studentsFilter(student) {
            var isMatch = vm.studentsSearch ? common.textContains(student.firstName, vm.studentsSearch) : true;
            //if (isMatch) { vm.filteredCount++; }
            return isMatch;
        }
    }
})();
