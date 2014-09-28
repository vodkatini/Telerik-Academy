'use strict';

var app = angular.module('ticTacToeApp', ['ngRoute', 'ngResource', 'ngCookies']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/register', {
                templateUrl: 'views/partials/register.html',
                controller: 'SignUpCtrl'
            })
            .when('/leader-board', {
                templateUrl: 'views/partials/leader-board.html',
                controller: 'LeaderBoardCtrl'
            })
            .when('/current-game', {
                templateUrl: '../views/partials/current-game.html',
                controller: 'CurrentGameCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr)
    .constant('baseServiceUrl', 'http://localhost:33257/');