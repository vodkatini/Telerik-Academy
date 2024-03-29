'use strict';

app.controller('LoginCtrl', ['$scope', '$location', 'notifier', 'identity', 'auth', 'current', 'games',
    function($scope, $location, notifier, identity, auth, current, games) {
    $scope.identity = identity;
    $scope.current = current;

    $scope.login = function(user, loginForm) {
        if (loginForm.$valid) {
            auth.login(user).then(function(success) {
                if (success) {
                    notifier.success('Successful login!');
                }
                else {
                    notifier.error('Username/Password combination is not valid!');
                }
            });
        }
        else {
            notifier.error('Username and password are required fields!')
        }
    }

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.email = '';
                $scope.user.username = '';
                $scope.user.password = '';
            }

            $scope.loginForm.$setPristine();
            current.setCurrentGame(false);
            $location.path('/');
        })
    }

    $scope.createGame = function (){
        games.createGame();
        $location.path('#/current-game');
    }

        $scope.joinGame = function (){
            games.joinGame();
            $location.path('#/current-game');
        }
}])