'use strict';

app.factory('games', ['$http', '$q', 'notifier', 'authorization', 'current', 'baseServiceUrl', function ($http, $q, notifier, authorization, current, baseServiceUrl) {

    return {
        getLeaderBoard: function(){
            var deferred = $q.defer();

            var headers = authorization.getAuthorizationHeader();

            $http.get(baseServiceUrl + 'api/games/getleaderboard', {headers: headers})
                .success(function(data, status, headers, config) {
                    notifier.success('successful');
                    deferred.resolve(data);
                })
                .error( function(response) {
                    notifier.error('unsuccessful');
                    deferred.reject(response.Message);
                });

            return deferred.promise;
        },
        createGame: function(){
            var deferred = $q.defer();

            var headers = authorization.getAuthorizationHeader();

            return $http.post(baseServiceUrl + 'api/games/create',{}, {headers: headers})
                .success(function(data) {
                    current.setCurrentGame(data);
                    notifier.success('successful');
                    deferred.resolve(data);
                })
                .error(function(response) {
                    deferred.reject(response);
                    notifier.error(response.Message);
                });

            return deferred.promise;
        },
        joinGame: function () {
            var deferred = $q.defer();

            var headers = authorization.getAuthorizationHeader();

            return $http.post(baseServiceUrl + 'api/games/join',{}, {headers: headers})
                .success(function(data) {
                    current.setCurrentGame(data);
                    deferred.resolve(data);
                    notifier.success('successful');
                })
                .error( function(response) {
                    deferred.reject(response);
                    notifier.error(response.Message);
                });

            return deferred.promise;
        },
        gameStatus: function () {
            var deferred = $q.defer();

            var headers = authorization.getAuthorizationHeader();
            var gameId = current.getCurrentGame();

            $http.get(baseServiceUrl + 'api/games/status?gameid=' + gameId, {headers: headers})
                .success(function(data){
                    deferred.resolve(data);
                    //notifier.success('successful');

                })
                .error( function(response) {
                      deferred.reject(response);
                      notifier.error(response.Message);
                });

            return deferred.promise;
        },
        play: function(row, col){
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            var gameId = current.getCurrentGame();
            var data = {
                GameId: gameId,
                Row: row,
                Col: col
            }

            $http.post(baseServiceUrl + 'api/games/play', data, {headers: headers})
                .success(function(response){
                    notifier.success('succesfull');
                    deferred.resolve(data);
                }).error( function(response){
                      deferred.reject(response);
                      notifier.error(response.Message);
                });

            return deferred.promise;
        }
    }
}]);