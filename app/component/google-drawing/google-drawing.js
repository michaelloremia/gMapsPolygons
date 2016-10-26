"use strict";

gMaps.controller('googleDrawingController', ['mapHelper', function(mapHelper) {
  var vm = this;
  var wktCollection = [];
  
  vm.onMapOverlayCompleted = function(e){
    if(e.overlay.getPath().getLength() < 3){
      alert("Not enought vertices. Draw a polygon that contains at least  3 vertices.");
      return;
    }

    var jstsPoly = mapHelper.createJstsPolygon(e.overlay);

    if(wktCollection.length >= 1) {
      var result = mapHelper.jstsCheckIntersection(jstsPoly, wktCollection);
      if(!result) {
        wktCollection.push(jstsPoly);
      } else {
        e.overlay.setMap(null);
        return;
      }
    } else {
      wktCollection.push(jstsPoly);
    }
    console.log(jstsPoly.getCoordinates());
    return;
  };
}]);

gMaps.component('googleDrawing', {
  templateUrl: './component/google-drawing/google-drawing.html'
});
