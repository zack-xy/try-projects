namespace 类型安全 {

  namespace 使用构造函数实施约束 {
    // 使用构造函数实施约束
    declare const celsiusType: unique symbol

    class Celsius {
      readonly value: number
      [celsiusType]: void

      constructor(value: number) {
        // 试图创建一个无效的温度，构造函数会抛出异常
        if(value < -273.15) throw new Error()
        /**
         * 强制值有效，如果输入无效的值，就是-273.15
         * if(value < -273.15) value = -273.15
         * 
         */

        this.value = value
      }
    }
  }

  // 想返回undefiend或者某个不是温度的其他实例
  namespace 使用工厂实施约束 {
    declare const celsiusType: unique symbol

    class Celsius {
      readonly value: number
      [celsiusType]: void

      // 构造函数声明为private，因为不执行任何检查
      private constructor(value: number) {
        this.value = value
      }

      // 工厂函数返回一个有效的Celsius实例，或者返回undefined
      static makeCelsius(value: number): Celsius | undefined {
        if(value < -273.15) return undefined

        return new Celsius(value)
      }

    }
  }

  namespace 实现Percentage {
    declare const percentageType: unique symbol

    class Percentage {
      readonly value: number
      [percentageType]: void

      constructor(value: number) {
        this.value = value
        if(value < 0) this.value = 0
        if(value > 100) this.value = 100
      }
    }
  }

  // 类型转换：我们比编译器更知道这个类型是啥
  namespace 汽车可以转换为自行车么 {
    class Bike {
      ride(): void {}
    }

    class SportsCar {
      drive(): void {}
    }

    let myBike: Bike = new Bike()
    myBike.ride()

    let myPretendSportsCar: SportsCar = <SportsCar><unknown>myBike
    myPretendSportsCar.drive()
  }

  // 类型转换的使用场景之
  namespace 在类型系统之外追踪类型 {

    class Either<TLeft, TRight> {
      private readonly value: TLeft | TRight
      private readonly left: boolean

      private constructor(value: TLeft | TRight, left: boolean) {
        this.value = value
        this.left = left    // 只有makeLeft和makeRight能够修改调用的私有构造函数中赋值left     
      }

      isLeft(): boolean {
        return this.left
      }

      getLeft(): TLeft {
        if(!this.isLeft()) throw new Error()
        return <TLeft>this.value
      }

      isRight(): boolean {
        return !this.isLeft
      }

      getRight(): TRight {
        if(!this.isRight()) throw new Error()
        return <TRight>this.value
      }

      // makeLeft和makeRight将left初始化为合适的值
      static makeLeft<TLeft, TRight>(value: TLeft) {
        return new Either<TLeft, TRight>(value, true)
      }

      static makeRight<TLeft, TRight>(value: TRight) {
        return new Either<TLeft, TRight>(value, false)
      }
    }

  }

  namespace 类型转换之向上转换 {
    class Shape {}

    declare const triangleType: unique symbol

    class Triangle extends Shape {
      [triangleType]: void
      /* .... */
    }

    function useShape(shape: Shape) {
      /* ... */
    }

    let myTriangle: Triangle = new Triangle()

    useShape(myTriangle)
  }

  namespace 类型转换之向下转换 {
    class Shape {}

    declare const triangleType: unique symbol

    class Triangle extends Shape {
      [triangleType]: void
      /*....*/
    }

    function useShape(shape: Shape, isTriangle: boolean) {
      if(isTriangle) {
        // 如果实参确实是一个三角形，将其转换为Triangel类型
        let triangle: Triangle = <Triangle>shape
        /* .... */
      }
      /* ... */
    }

    let myTriangle: Triangle = new Triangle()
    useShape(myTriangle, true)

  }

}

namespace 异构集合 {
  namespace 实现接口的类型集合 {
    interface IDocumentItem {
      /* .... */
    }

    class Paragraph implements IDocumentItem {
      /* ... */
    }

    class Picture implements IDocumentItem {
      /* ... */
    }

    class Table implements IDocumentItem {
      /* ... */
    }

    class MyDocument {
      items: IDocumentItem[]
      // 使用和类型 items: (Paragraph | Picture | Table)[]
      // 任何类型: items: unknown[]
    }
  }
}

namespace 序列化与反序列化 {
  namespace 反序列化cat {
    class Cat {
      meow() {
        /* ... */
      }
    }
    
    let serializedCat: string = JSON.stringify(new Cat())

    let deserializedCat: Cat = <Cat>Object.assign(new Cat(), JSON.parse(serializedCat))

    deserializedCat.meow()

    
  }

  namespace 序列化及追踪类型 {
    class Cat {
      meow() {}
    }

    class Dog {
      bark() {}
    }

    function serializeCat(cat: Cat): string {
      return "C" + JSON.stringify(cat)
    }

    function serializeDog(dog: Dog): string {
      return "D" + JSON.stringify(dog)
    }

    function tryDeserializeCat(from: string): Cat | Dog {
      if(from[0] != "C") return undefined

      return <Cat>Object.assign(new Cat(), JSON.parse(from.substr(1)))
    }

  }
}
