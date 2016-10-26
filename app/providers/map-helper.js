"use strict";

gMaps.factory('mapHelper', function () {
    var geometryFactory = new jsts.geom.GeometryFactory();
    return {
        jstsCheckIntersection(jstsPoly, jstsPolyCollection) {
            var result = jstsPolyCollection.filter(function (curPolygon) {
                var intersection = jstsPoly.intersection(curPolygon);
                return intersection.isEmpty() == false;
            });
            return result.length > 0;
        },
        createJstsPolygon(overlay) {
            var path = overlay.getPath();
            var coordinates = path.getArray().map(function name(coord) {
                return new jsts.geom.Coordinate(coord.lat(), coord.lng());
            });
            coordinates.push(coordinates[0]);
            var shell = geometryFactory.createLinearRing(coordinates);
            return geometryFactory.createPolygon(shell);
        }
        };
});