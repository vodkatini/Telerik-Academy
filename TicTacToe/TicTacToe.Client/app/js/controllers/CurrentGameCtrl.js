'use strict';

app.controller('CurrentGameCtrl', ['$scope', 'games', 'current',
    function($scope, games, current){

        $scope.reset = function(result){
            current.setCurrentGame(result);
        };

        $scope.position = function(row, col){
            games.play(row, col).then(getCurrentGame());
        };

        function getCurrentGame(){
            if(!current.getCurrentGame()){
                clearInterval(refreshInterval);
                return;
            }

            games.gameStatus().then(function(data){
                switch (data.State){
                    case 0:
                        data.State = 'Waiting for another player';
                        break;
                    case 1:
                        data.State = 'Player X turn';
                        break;
                    case 2:
                        data.State = 'Player O turn';
                        break;
                    case 3:
                        data.State = 'Game Over! X won';
                        current.setCurrentGame(false);
                        break;
                    case 4:
                        data.State = 'Game Over! O won';
                        $scope.isGameOver = true;
                        break;
                    case 5:
                        data.State = 'Game Over! Draw';
                        $scope.isGameOver = true;
                        break;
                }

                $scope.game = data;
            })
        }

        getCurrentGame();
        var refreshInterval = setInterval(getCurrentGame, 1000);

}]);