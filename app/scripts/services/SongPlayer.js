 (function() {
     
     /**
     * @function SongPlayer
     * @desc Returns SongPlayer object containing various functions, attributes, and methods
     *  relating to the playing and pausing of a song object in the album page
     * @returns {Object}
     */
     
     function SongPlayer() {
         var SongPlayer = {};

         /**
         * @desc current song audio file placeholder
         * @type {Object}
         */
         
         var currentSong = null;

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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };
         
         /**
         * @function playSong
         * @desc Plays file loaded as currentBuzzObject and sets playing property of song object 
         *  to true
         * @param {Object} song
         */
         
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         }
         
         
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 //currentBuzzObject.play();
                 //song.playing = true;
                 playSong(song);
             } else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }
             }
         };
         
         SongPlayer.pause = function(song) {
             currentBuzzObject.pause();
             song.playing = false;
         };
         return SongPlayer;
     }
     angular.module('blocJams').factory('SongPlayer', SongPlayer);
 })();