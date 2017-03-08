(function() {
     function LandingCtrl() {
         this.heroTitle = "Turn the Music Up!";
     }

     angular
         .module('buzzJams')
         .controller('LandingCtrl', LandingCtrl);
 })();
