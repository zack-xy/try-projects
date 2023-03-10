
  class Variant<T1, T2, T3> {
    readonly value: T1 | T2 | T3
    readonly index: number
  
    private constructor(value: T1 | T2 | T3, index: number) {
      this.value = value
      this.index = index
    }
  
    static make1<T1, T2, T3>(value: T1): Variant<T1, T2, T3> {
      return new Variant<T1, T2, T3>(value, 0)
    }
  
    static make2<T1, T2, T3>(value: T2): Variant<T1, T2, T3> {
      return new Variant<T1, T2, T3>(value, 1)
    }
  
    static make3<T1, T2, T3>(value: T3): Variant<T1, T2, T3> {
      return new Variant<T1, T2, T3>(value, 2)
    }
  }
  
  
  
  // 使用
  // 将形状的联合作为变体
  // 形状不需要自己存储标签
  
  class Point2 {
    x: number = 0
    y: number = 0
  }
  
  class Circle2 {
    x: number = 0
    y: number = 0
    radius: number = 0
  }
  
  class Rectangle2 {
    x: number = 0
    y: number = 0
    width: number = 0
    height: number = 0
  }
  
  type Shape2 = Variant<Point2, Circle2, Rectangle2>
  
  let shapes2: Shape2[] = [
    Variant.make2(new Circle2()),
    Variant.make3(new Rectangle2())
  ]
  
  for(let shape of shapes2) {
    switch(shape.index) {
      case 0:
        let point: Point2 = <Point2>shape.value
        console.log(`Point ${JSON.stringify(point)}`)
        break
      case 1:
        let circle: Circle2 = <Circle2>shape.value
        console.log(`Circle ${JSON.stringify(circle)}`)
        break
      default:
        throw new Error()
    }
  }
  

