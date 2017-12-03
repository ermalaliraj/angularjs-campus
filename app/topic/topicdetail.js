(function () {
    'use strict';

    angular
        .module('app.topic')
        .controller('TopicDetail', TopicDetail);

    TopicDetail.$inject = [
        '$location', '$scope', '$routeParams', '$window',
        'bootstrap.dialog', 'common', 'Topics'
    ];

    function TopicDetail($location, $scope, $routeParams, $window,
                         bsDialog, common, Topics) {
        var vm = this;
        var logger = common.logger;
        var $q = common.$q;

        vm.deleteTopic = deleteTopic;
        vm.goBack = goBack;
        vm.isSaving = false;
        vm.save = save;
        vm.topic = undefined;

        Object.defineProperty(vm, 'canSave', {get: canSave});

        activate();

        function activate() {
            getRequestedTopic();
        }

        function getRequestedTopic() {
            var val = $routeParams.id;
            if (val === 'new') {
                vm.topic = {};
                return vm.topic;
            }
            Topics.get(val, function (topic) {
                vm.topic = topic;
            });
            return vm.topic;
        }

        function save() {
            if (!canSave()) {
                return $q.when(null);
            } // Must return a promise

            Topics.save(vm.topic, function () {
                logger.info("Topic " + vm.topic.name + " saved with success!");
            });
        }

        function deleteTopic() {
            return bsDialog.deleteDialog('Topic')
                .then(confirmDelete);

            function confirmDelete() {
                Topics.delete(vm.topic.id, function () {
                    logger.warning("Topic " + vm.topic.name + " deleted with success (non really!)");
                    gotoTopics();
                });
            }
        }

        function canSave() {
            return !vm.isSaving;
        }

        function goBack() {
            $window.history.back();
        }

        function gotoTopics() {
            $location.path('/topics');
        }
    }
})();
