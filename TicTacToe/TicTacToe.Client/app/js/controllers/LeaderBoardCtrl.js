'use strict';

app.controller('LeaderBoardCtrl', ['$scope', 'games', 'notifier', function($scope, games, notifier) {
        games.getLeaderBoard().then(function(response){
            $scope.users = response;
        })
}]);