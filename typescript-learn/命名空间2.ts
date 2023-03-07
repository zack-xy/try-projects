/// <reference path="命名空间.ts" />

namespace Shape {
  export function square(x: number) {
    return x * x
  }
}

Shape.cirlce(1)
Shape.square(2)


// 命名空间和模块不要混用

import circle = Shape.circle
console.log(circle(1));
