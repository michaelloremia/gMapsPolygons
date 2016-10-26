"use strict";

gMaps.controller('DrawingManagerCtrl', ['mapHelper', function(mapHelper) {
  var vm = this;
  var wktCollection = [];
  
  vm.onMapOverlayCompleted = function(e){
    // var wktObj = mapHelper.googlePolyToWKT(e.overlay);
    // //check collision
    // if(wktCollection.length >= 1) {
    //     var collision = mapHelper.checkInterSection(wktObj, wktCollection);
    //     console.log('does it collide: ' + collision);
    //     if(!collision)
    //         wktCollection.push(wktObj);
    // } else {
    //     wktCollection.push(wktObj);
    // }
    // //call e.overlay.setMap(null); on collision
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
      }
    } else {
      wktCollection.push(jstsPoly);
    }
  };
}]);

function googleDrawingController(mapHelper) {
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
    console.log(jstsPoly.getPath());
    return;
  };
}

gMaps.component('googleDrawing', {
  templateUrl: '',
  controller: googleDrawingController
});

