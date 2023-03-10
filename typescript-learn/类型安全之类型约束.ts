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

}
