(function () {
    'use strict';

    angular
        .module('app.courses')
        .controller('CourseDetail', CourseDetail);

    CourseDetail.$inject = [
        '$location', '$scope', '$routeParams', '$window',
        'common', 'config'
    ];

    function CourseDetail($location, $scope, $routeParams, $window,
                           common, config) {
        /*jshint validthis: true */
        var vm = this;
        var logger = common.logger;
        var $q = common.$q;
        var wipEntityKey;

        vm.cancel = cancel;
        vm.goBack = goBack;
        vm.save = save;
        vm.course = null;
        vm.courses = [];

        Object.defineProperty(vm, 'canSave', {get: canSave});

        activate();

        function activate() {
            onHasChanges();

        }

        function cancel() {
            common.replaceLocationUrlGuidWithId(vm.course.id);
            if (vm.course.entityAspect.entityState.isDetached()) {
                gotoCourses();
            }
        }

        function canSave() {
            return vm.hasChanges && !vm.isSaving;
        }

        function onHasChanges() {
            $scope.$on(config.events.hasChangesChanged,
                function (event, data) {
                    vm.hasChanges = data.hasChanges;
                });
        }

        function save() {
            if (!canSave()) {
                return $q.when(null);
            } // Must return a promise

            vm.isSaving = true;

            common.replaceLocationUrlGuidWithId(vm.course.id);
        }

        function goBack() {
            $window.history.back();
        }

        function gotoCourses() {
            $location.path('/courses');
        }
    }
})();