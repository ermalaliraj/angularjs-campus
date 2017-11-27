(function () {
    'use strict';

    angular
        .module('app.courses')
        .controller('CourseDetail', CourseDetail);

    CourseDetail.$inject = [
        '$location', '$scope', '$routeParams', '$window',
        'common', 'config', 'model'
    ];

    function CourseDetail($location, $scope, $routeParams, $window,
                           common, config, model) {
        /*jshint validthis: true */
        var vm = this;
        var entityName = model.entityNames.course;
        var logger = common.logger;
        var $q = common.$q;
        var wipEntityKey;

        vm.cancel = cancel;
        vm.goBack = goBack;
        vm.hasChanges = false;
        vm.isSaving = false;
        vm.save = save;
        vm.course = null;
        vm.courses = [];

        Object.defineProperty(vm, 'canSave', {get: canSave});

        activate();

        function activate() {
            onDestroy();
            onHasChanges();
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready([getRequestedCourse()]).then(onEveryChange);
            return getRequestedCourse().then(onEveryChange);
        }

        function autoStoreWip(immediate) {
            common.debouncedThrottle('coursedetail', storeWipEntity, 1000, immediate);
        }

        function cancel() {
            removeWipEntity();
            common.replaceLocationUrlGuidWithId(vm.course.id);
            if (vm.course.entityAspect.entityState.isDetached()) {
                gotoCourses();
            }
        }

        function canSave() {
            return vm.hasChanges && !vm.isSaving;
        }

        function getRequestedCourse() {
            var val = $routeParams.id;

            return {};
        }

        function goBack() {
            $window.history.back();
        }

        function gotoCourses() {
            $location.path('/courses');
        }

        function onDestroy() {
            $scope.$on('$destroy', function () {
                autoStoreWip(true);
            });
        }

        function onEveryChange() {
            $scope.$on(config.events.entitiesChanged, function (event, data) {
                autoStoreWip();
            });
        }

        function onHasChanges() {
            $scope.$on(config.events.hasChangesChanged,
                function (event, data) {
                    vm.hasChanges = data.hasChanges;
                });
        }

        function removeWipEntity() {
            ;
        }

        function save() {
            if (!canSave()) {
                return $q.when(null);
            } // Must return a promise

            vm.isSaving = true;

            common.replaceLocationUrlGuidWithId(vm.course.id);
        }

        function storeWipEntity() {
            if (!vm.course) {
                return;
            }
            var description = (vm.course.fullName || '[New courses]') + ' ' + vm.course.id;
            var routeState = 'course';
            wipEntityKey = {};
        }
    }
})();