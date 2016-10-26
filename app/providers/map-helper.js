"use strict";

gMaps.factory('mapHelper', function () {
    var geometryFactory = new jsts.geom.GeometryFactory();
    return {
        googlePolyToWKT(poly) {
            console.log('converting poly to wkt');
            var wicket = new Wkt.Wkt();

            var wkt = wicket.fromObject(poly);
            wkt = wicket.write();
            return wkt;
        },
        checkInterSection(wkt, wktCollection) {
            var wktReader = new jsts.io.WKTReader();
            var geom1 = wktReader.read(wkt);
            wktCollection.forEach(function(a,b) {
                var geom2 = wktReader.read(a);
                if (geom2.intersects(geom1)) {
                    return true;
                }
            });
            return false;
        },
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