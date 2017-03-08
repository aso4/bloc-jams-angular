 (function() {
     function seekBar($document) {
         var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
         };

         return {
             templateUrl: '/templates/directives/seek_bar.html',
             replace: true,
             restrict: 'E',
             scope: {
                 onChange: '&'
             },
             link: function(scope, element, attributes) {
                 /**
                 * @desc Holds the value of the seek bar, such as the currently playing song time or the current volume. Default value is 0.
                 * @type {Number}
                 */
                 scope.value = 0;
                 /**
                 * @desc Holds the maximum value of the song and volume seek bars. Default value is 100.
                 * @type {Number}
                 */
                 scope.max = 100;

                 /**
                 * @desc Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it.
                 * @type {Object}
                 */
                 var seekBar = $(element);

                 attributes.$observe('value', function(newValue) {
                     scope.value = newValue;
                 });

                 attributes.$observe('max', function(newValue) {
                     scope.max = newValue;
                 });

                 /**
                 * @function percentString
                 * @desc A function that calculates a percent based on the value and maximum value of a seek bar.
                 * @returns {String} number%
                 */
                 var percentString = function () {
                     var value = scope.value || 0;
                     var max = scope.max || 100;
                     var percent = value / max * 100;
                     return percent + "%";
                 };

                 /**
                 * @function fillStyle
                 * @desc Returns the width of the seek bar fill element based on the calculated percent.
                 * @returns {String} width assignment calculated by percentString
                 */
                 scope.fillStyle = function() {
                     return {width: percentString()};
                 };

                 scope.thumbStyle = function() {
                     return {left: percentString()};
                 }

                 /**
                 * @function onClickSeekBar
                 * @desc Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar.
                 * @param {Object} event in DOM
                 */
                 scope.onClickSeekBar = function(event) {
                     var percent = calculatePercent(seekBar, event);
                     scope.value = percent * scope.max;
                     notifyOnChange(scope.value);
                 };

                 /**
                 * @function trackThumb
                 * @desc Similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of scope.value as the user drags the seek bar thumb.
                 */
                 scope.trackThumb = function() {
                     $document.bind('mousemove.thumb', function(event) {
                         var percent = calculatePercent(seekBar, event);
                         scope.$apply(function() {
                             scope.value = percent * scope.max;
                             notifyOnChange(scope.value);
                         });
                     });

                     $document.bind('mouseup.thumb', function() {
                         $document.unbind('mousemove.thumb');
                         $document.unbind('mouseup.thumb');
                     });
                 };

                 /**
                 * @function notifyOnChange
                 * @desc Insert the local newValue variable as the value argument we pass into the SongPlayer.setCurrentTime() function called in the view.
                 * @param {Number}
                 */
                 var notifyOnChange = function(newValue) {
                     if (typeof scope.onChange === 'function') {
                         scope.onChange({value: newValue});
                     }
                 };
             }
         };
     }

     angular
         .module('buzzJams')
         .directive('seekBar', ['$document', seekBar]);
 })();
