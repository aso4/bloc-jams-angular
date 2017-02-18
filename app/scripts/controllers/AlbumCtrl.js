(function() {
    function AlbumCtrl($scope, Fixtures, SongPlayer) {
        $scope.albumData = Fixtures.getAlbum();
        songPlayer = SongPlayer;

        var hoveredSong = null;


        $scope.onHoverSong = function(song) {
          hoveredSong = song;
        };

        $scope.offHoverSong = function(song) {
          hoveredSong = null;
        };
        $scope.getSongState = function(song) {
          if (song === songPlayer.currentSong && songPlayer.playing) {
            return 'playing';
          }
          else if (song === hoveredSong) {
            return 'hovered';
          }
          return 'default';
        };

        $scope.playSong = function(song) {
          songPlayer.setSong(this.album, song);
          songPlayer.play();
         };

        $scope.pauseSong = function(song) {
          songPlayer.pause();
         };
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['$scope', 'Fixtures', 'SongPlayer', AlbumCtrl]);
})();
