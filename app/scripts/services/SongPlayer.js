 (function() {

     /**
     * @function SongPlayer
     * @desc Returns SongPlayer object containing various functions, attributes, and methods
     *  relating to the playing and pausing of a song object in the album page
     * @returns {Object}
     */

     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Store album information
         * @type {Object}
         */

         var currentAlbum = Fixtures.getAlbum();

         /**
         * @function getSongIndex
         * @desc Index number of song in song array in album
         * @returns {Number} index
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };

         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;

         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */

         SongPlayer.currentSong = null;

         SongPlayer.volume = null;

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */

         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
         };

         /**
         * @function playSong
         * @desc Plays current Buzz object and sets playing property of song object
         *  to true
         * @param {Object} song
         */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         }

         /**
         * @function stopSong
         * @desc Stops playing current Buzz object and playing property of song object
         *  to false
         * @param {Object} song
         */
         var stopSong = function(song) {
             currentBuzzObject.stop();
             song.playing = null;
         }

         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */

         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }
             }
         };

         /**
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         /**
         * @function previous
         * @desc Skip to previous song in album
         * @param {Object} song
         */
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         /**
         * @function next
         * @desc Skip to next song in album
         * @param {Object} song
         */
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             if (currentSongIndex > currentAlbum.songs.length) {
                 stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };

         SongPlayer.setVolume = function(volume) {
             SongPlayer.volume = currentBuzzObject.setVolume(volume);
         };


         return SongPlayer;
     }
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
