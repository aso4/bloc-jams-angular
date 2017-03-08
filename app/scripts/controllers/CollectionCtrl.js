 (function() {
     function CollectionCtrl(Fixtures) {
         this.albums = Fixtures.getCollection(12);
     }

     angular
         .module('buzzJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();
