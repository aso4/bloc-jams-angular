(function() {
    function AlbumCtrl($scope, Fixtures, SongPlayer) {
        $scope.albumData = Fixtures.getAlbum();
        $scope.songPlayer = SongPlayer;

        var hoveredSong = null;


        $scope.onHoverSong = function(song) {
          hoveredSong = song;
        };

        $scope.offHoverSong = function(song) {
          hoveredSong = null;
        };
        $scope.getSongState = function(song) {
          if (song === $scope.songPlayer.currentSong && $scope.songPlayer.playing) {
            return 'playing';
          }
          else if (song === $scope.songPlayer.currentSong && $scope.songPlayer.currentTime != 0) {
            return 'paused';
          }
          else if (song === hoveredSong) {
            return 'hovered';
          }
          return 'default';
        };

        $scope.playSong = function(song) {
          $scope.songPlayer.setSong(this.album, song);
          $scope.songPlayer.play();
         };

        $scope.pauseSong = function(song) {
          $scope.songPlayer.pause();
         };

       $scope.resumeSong = function(song) {
         $scope.songPlayer.play();
        };

    }

    angular
        .module('buzzJams')
        .controller('AlbumCtrl', ['$scope', 'Fixtures', 'SongPlayer', AlbumCtrl]);
})();
