// 定义为元组的两个点之间的距离

type Point = [number, number]

function distance(point1: Point, point2: Point): number {
  return Math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2)
}


// 自制元组
// 成对类型

class Pair<T1, T2> {
  m0: T1
  m1: T2

  constructor(m0: T1, m1: T2) {
    this.m0 = m0
    this.m1 = m1
  }
}

type Point1 = Pair<number, number>

function distance1(point1: Point1, point2: Point1): number {
  return Math.sqrt((point1.m0 - point2.m0) ** 2 + (point1.m1 - point2.m1) ** 2)
} 

// 以上，我们是认为point是一个坐标点(x,y)
// 但是有可能认错，错把x当作y，y当作x
// 此时需要记录类型来实现

// 记录类型
// 可以为分量设置名称，通过名称来访问值
// 在不同语言中，记录类型被称为记录或者结构


// 定义为记录的两个点之间的距离
class Point2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

function distance2(point1: Point2, point2: Point2):number {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
}

// 当定义记录类型时，如果成员是独立的，并且变化时不会产生问题，就可以标记为公有的
// 上面定义坐标对属于这种情况，x，y坐标可以变化，且可以单独变化
// 定义货币类型
// 美元值必须是大于或等于0的一个整数，可安全地用number类型表示
// 美分值必须是大于或等于0的一个整数，可安全地用number类型表示
// 美分值不能大于99:每100美分应该被转换为1美元

class Currency {
  // 使dollars和cents私有，确保外部代码不能绕过验证
  private dollars: number = 0
  private cents: number = 0

  constructor(dollars: number, cents: number) {
    this.assignDollars(dollars)
    this.assignCents(cents)
  }

  getDollars(): number {
    return this.dollars
  }

  assignDollars(dollars: number) {
    // 如果美元无效值，则抛出异常
    if(!Number.isSafeInteger(dollars) || dollars < 0)
      throw new Error()
    this.dollars = dollars
  }

  getCents(): number {
    return this.cents
  }

  assignCents(cents: number) {
    if(!Number.isSafeInteger(cents) || cents < 0)
      throw new Error()
    // 转化美分为美元 
    this.assignDollars(this.dollars + Math.floor(cents / 100))
    this.cents = cents % 100
  }
}

// 不可变的Currency
// 不可变数据的优势：在不同的线程中并发访问这些数据是安全的
// 因为数据不会改变
// 缺点：每当需要一个新值时，就需要创建一个新实例
class Currency2 {
  // dollars和cents是公开的，但它们是只读的，在初始化后不能改变
  readonly dollars: number
  readonly cents: number

  constructor(dollars: number, cents: number) {
    // 所有的验证都发生在构造函数中
    if(!Number.isSafeInteger(cents) || cents < 0)
      throw new Error()

    dollars = dollars + Math.floor(cents / 100)
    cents = cents % 100

    if(!Number.isSafeInteger(dollars) || dollars < 0)
      throw new Error()
    
    this.dollars = dollars
    this.cents = cents
      
  }
}



