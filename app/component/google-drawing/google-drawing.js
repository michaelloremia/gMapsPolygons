"use strict";

gMaps.controller('googleDrawingController', ['mapHelper', function(mapHelper) {
  var vm = this;
  var jstsPolyCollection = [];
  
  vm.onMapOverlayCompleted = function(e){
    if(e.overlay.getPath().getLength() < 3){
      alert("Not enought vertices. Draw a polygon that contains at least  3 vertices.");
      return;
    }

    var jstsPoly = mapHelper.createJstsPolygon(e.overlay);

    if(jstsPolyCollection.length >= 1) {
      var result = mapHelper.jstsCheckIntersection(jstsPoly, jstsPolyCollection);
      if(!result) {
        jstsPolyCollection.push(jstsPoly);
      } else {
        e.overlay.setMap(null);
        return;
      }
    } else {
      jstsPolyCollection.push(jstsPoly);
    }
    console.log(jstsPoly.getCoordinates());
    return;
  };
}]);

gMaps.component('googleDrawing', {
  templateUrl: './component/google-drawing/google-drawing.html'
});
