var Shape;
(function (Shape) {
    var pi = Math.PI;
    function cirlce(r) {
        return pi * Math.pow(r, 2);
    }
    Shape.cirlce = cirlce;
})(Shape || (Shape = {}));
