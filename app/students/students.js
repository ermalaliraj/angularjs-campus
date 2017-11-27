(function () {
    'use strict';

    angular
        .module('app.students')
        .controller('Students', Students);

    Students.$inject = ['config'];

    function Students(config) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;

        vm.attendeeCount = 0;
        vm.attendeeFilteredCount = 0;
        vm.attendeeSearch = '';
        vm.attendees = [];
        vm.filteredAttendees = [];
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
    
                if (vm.attendeeFilteredCount % vm.paging.pageSize == 0)
                    val = 0;
    
                return Math.floor(vm.attendeeFilteredCount / vm.paging.pageSize) + val;                
            }
        });

        activate();

        function activate() {
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready([getAttendees()]);
            return getAttendees();
        }

        function getAttendeeCount() {
            return 3;
        }

        function getAttendees(forceRefresh) {
            return {};
        }

        function getAttendeeFilteredCount() {
            vm.attendeeFilteredCount = 4;
        }

        function pageChanged() {
            getAttendees();
        }

        function refresh() {
            return getAttendees(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.attendeeSearch = '';
            }
            getAttendees();
        }
    }
})();
