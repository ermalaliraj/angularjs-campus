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

        vm.studentsSearch = '';
        vm.students = [];
        vm.studentsCount = 0;
        vm.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 2
        };
        vm.pageChanged = pageChanged;
        vm.refresh = refresh;
        vm.search = search;
        vm.title = 'Students';

        Object.defineProperty(vm.paging, 'pageCount', {
            get: function() {
                var val = 1;
                if (vm.studentsCount % vm.paging.pageSize == 0) {
                    val = 0;
                }
                return Math.floor(vm.studentsCount / vm.paging.pageSize) + val;
            }
        });

        activate();

        function activate() {
            return getStudents();
        }

        function getStudents() {
            Students.list((vm.paging.currentPage - 1), vm.paging.pageSize, function (students) {
               // console.debug(students);
                vm.students = students;
                getStudentsCount();
            });
            return vm.students;
        }

        function getStudentsCount() {
            Students.count(function (count) {
                vm.studentsCount = count;
            });
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
            vm.students = vm.students.filter(studentsFilter);
            getStudentsCount();
        }
        function studentsFilter(student) {
            var isMatch = vm.studentsSearch ? common.textContains(student.firstName, vm.studentsSearch) : true;
            //if (isMatch) { vm.filteredCount++; }
            return isMatch;
        }
    }
})();
