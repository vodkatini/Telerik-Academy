'use strict';

app.factory('current', ['$cookieStore', function($cookieStore) {
    var cookieStorageGameKey = 'currentGame';

    var currentGame;
    return {
        getCurrentGame: function() {
            var savedGame = $cookieStore.get(cookieStorageGameKey);
            if (savedGame) {
                return savedGame;
            }

            return currentGame;
        },
        setCurrentGame: function(game) {
            game = JSON.parse(game);
            if (game) {
                $cookieStore.put(cookieStorageGameKey, game);
            }
            else {
                $cookieStore.remove(cookieStorageGameKey);
            }

            currentGame = game;
        },
        isCurrentGame: function() {
            return !!this.getCurrentGame();
        }
    }
}]);