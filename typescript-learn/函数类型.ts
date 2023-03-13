namespace 函数类型 {
  // 策略模式
  namespace 洗车策略 {
    // 假设一个停车场，提供2种类型的服务，标准洗车和高档洗车
    class Car {} // 表示要洗的车

    // 策略模式接口，提供wash方法
    interface IWashingStrategy {
      wash(car: Car): void
    }

    class StandarWash implements IWashingStrategy {
      wash(car: Car): void {
          /* Perform standard wash */
      }
    }

    class PremiumWash implements IWashingStrategy {
      wash(car: Car): void {
        /* Perform premium wash */
      }
    }

    class CarWash {
      service(car: Car, premium: boolean) {
        let washingStrategy: IWashingStrategy

        if(premium) {
          washingStrategy = new PremiumWash()
        } else {
          washingStrategy = new StandarWash()
        }

        washingStrategy.wash(car)
      }
    }
  }

  namespace 函数式洗车策略 {
    class Car {}

    type WashingStrategy = (car: Car) => void

    function standardWash(car: Car): void {
      /* Perform standard wash  */
    }

    function premiumWash(car: Car): void {
      /* Perform premium wash */
    }

    class CarWash {
      service(car: Car, premium: boolean) {
        let washingStrategy: WashingStrategy

        if(premium) {
          washingStrategy = premiumWash
        } else {
          washingStrategy = standardWash
        }

        washingStrategy(car)
      }
    }
  }
}
