namespace 创建Car的例子 {
  // 假设创建Car开销比较高
  class Bike {}
  class Car {}
  function chooseMyRide(bike: Bike, car: Car): Bike | Car {
    if(isItRaining()) {
      return car
    } else {
      return bike
    }
  }
  // 创建了一个Car，即使并没有用到
  chooseMyRide(new Bike(), new Car())

  function isItRaining() { return false }

  namespace 延迟生成car {

    class Bike {}
    class Car {}

    // 现在chooseMyRide的实参不是Car，而是一个返回Car的函数
    function chooseMyRide(bike: Bike, car: ()=> Car): Bike | Car {
      if(isItRaining()) {
        return car()
      } else {
        return bike
      }
    }

    function makeCar(): Car {
      return new Car()
    }

    chooseMyRide(new Bike(), makeCar)
  }

  namespace 匿名生成car {
    class Bike {}
    class Car {}
    function chooseMyRide(bike: Bike, car: () => Car): Bike | Car {
      if(isItRaining()) {
        return car()
      } else {
        return bike
      }
    }
    chooseMyRide(new Bike(), ()=> new Car())
  }
}
