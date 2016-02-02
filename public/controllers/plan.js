var controllers = angular.module('app.controllers.PlanController', ['ngFileUpload']);

controllers.controller('PlanController', function($scope, $http, $location, $routeParams) {
    $scope.uuid = $routeParams.uuid;

    $scope.submit = function() {
        var data = {'planning' : $scope.planning_txt};

        $http.put('/api/planning/' + $scope.uuid, data)
            .success(function() {
                $scope.refresh();
            })
            .error(function(err, status) {
                console.log(err, status);
            });
    };

    $scope.refresh = function() {
        $http.get('/api/planning/'+ $scope.uuid + '/')
            .success(function(data) {
                $scope.planning_txt = data.planning.planning_txt;
                if (data.planning.planning_txt) {
                    $http.get('/api/planning/'+ $scope.uuid + '/preview')
                        .success(function(data) {
                            $scope.preview = data.preview;
                        })
                        .error(function(err, status) {
                            console.log(err, status);
                        });
                }
            })
            .error(function(err, status) {
                console.log(err, status);
        });
    };

    $scope.refresh();

});