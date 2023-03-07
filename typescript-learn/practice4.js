/// <reference path="practice3.ts" />
var Shape;
(function (Shape) {
    function square(x) {
        return x * x;
    }
    Shape.square = square;
})(Shape || (Shape = {}));
Shape.cirlce(1);
Shape.square(2);
// 命名空间和模块不要混用
