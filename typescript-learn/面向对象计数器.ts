namespace 面向对象计数器 {
  
  class Counter {
    private n: number = 1

    next(): number {
      return this.n++
    }
  }

  let counter1: Counter = new Counter()
  let counter2: Counter = new Counter()

  console.log(counter1.next())
  console.log(counter2.next())

}

namespace 函数式计数器 {

  type Counter = () => number

  function makeCounter(): Counter {
    let n: number = 1

    return () => n++
  }

  let counter1: Counter = makeCounter()
  let counter2: Counter = makeCounter()

  console.log(counter1())
  console.log(counter2())

}

namespace 可恢复的计数器 {

  function* counter(): IterableIterator<number> {
    let n: number = 1

    while(true) {
      yield n++
    }
  }

  let counter1: IterableIterator<number> = counter()
  let counter2: IterableIterator<number> = counter()

  console.log(counter1.next())
  console.log(counter2.next())
}
