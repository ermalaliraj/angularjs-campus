(function() {
    'use strict';

    angular
        .module('app.topic')
        .controller('TopicDetail', TopicDetail);

    TopicDetail.$inject = [
        '$location', '$scope', '$routeParams', '$window',
        'bootstrap.dialog', 'common', 'config', 'model'
    ];

    function TopicDetail(
        $location, $scope, $routeParams, $window,
        bsDialog, common, config, model) {
        /*jshint validthis: true */
        var vm = this;
        var entityName = model.entityNames.topic;
        var logger = common.logger;
        var $q = common.$q;
        var wipEntityKey;

        vm.cancel = cancel;
        vm.deleteTopic = deleteTopic;
        vm.goBack = goBack;
        vm.hasChanges = false;
        vm.isSaving = false;
        vm.rooms = [];
        vm.save = save;
        vm.topic = undefined;
        vm.courses = [];
        vm.timeslots = [];
        vm.tracks = [];

        Object.defineProperty(vm, 'canSave', {get: canSave});

        activate();

        function activate()     {
            initLookups();
            onDestroy();
            onHasChanges();
            // Whether we succeed or fail, we still want to call onEveryChange
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready([getRequestedTopic()]).then(onEveryChange);
            return getRequestedTopic().then(onEveryChange);
        }

        function autoStoreWip(immediate) {
            common.debouncedThrottle('topicdetail', storeWipEntity, 1000, immediate);
        }

        function cancel() {
            removeWipEntity();
            common.replaceLocationUrlGuidWithId(vm.topic.id);
            if (vm.topic.entityAspect.entityState.isDetached()) {
                gotoTopics();
            }
        }

        function canSave() {
            return vm.hasChanges && !vm.isSaving;
        }

        function deleteTopic() {
            return bsDialog.deleteDialog('Topic')
                .then(confirmDelete);

            function confirmDelete() {
                vm.save().then(success).catch(failed);

                function success() {
                    removeWipEntity();
                    gotoTopics();
                }

                function failed(error) {
                    cancel(); // Makes the entity available to edit again
                }
            }
        }

        function getRequestedTopic() {
            var val = $routeParams.id;
            if (val === 'new') {
                vm.topic = {};
                return vm.topic;
            }
        }

        function goBack() {
            $window.history.back();
        }

        function gotoTopics() {
            $location.path('/topics');
        }

        function initLookups() {
            // Get the lookups lists and their nullo option
            var lookups = {rooms: {}, timeslots: {}, tracks: {}, courses: {}};
            vm.rooms = lookups.rooms;
            vm.timeslots = lookups.timeslots;
            vm.tracks = lookups.tracks;
            // Get all courses from cache (they are local already)
            vm.courses = {};
        }

        function onDestroy() {
            $scope.$on('$destroy', function() {
                autoStoreWip(true);
            });
        }

        function onEveryChange() {
            $scope.$on(config.events.entitiesChanged,
                function(event, data) {
                    autoStoreWip();
                });
        }

        function onHasChanges() {
            $scope.$on(config.events.hasChangesChanged,
                function(event, data) {
                    vm.hasChanges = data.hasChanges;
                });
        }

        function removeWipEntity() {

        }

        function save() {
            if (!canSave()) {
                return $q.when(null);
            } // Must return a promise

            vm.isSaving = true;
            return {};
        }

        function storeWipEntity() {
            if (!vm.topic) {
                return;
            }
            var description = vm.topic.title || '[New Topic]' + vm.topic.id;
            wipEntityKey ={};
        }
    }
})();
