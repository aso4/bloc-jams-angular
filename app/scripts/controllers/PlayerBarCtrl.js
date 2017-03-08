 (function() {
     function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
         $scope.albumData = Fixtures.getAlbum();
         $scope.songPlayer = SongPlayer;
     }

     angular
         .module('buzzJams')
         .controller('PlayerBarCtrl', ['$scope', 'Fixtures', 'SongPlayer', PlayerBarCtrl]);
 })();
