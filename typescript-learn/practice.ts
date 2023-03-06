interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

function getLib(version: string) {
  let lib: Lib = (() => {}) as Lib
  lib.version = version
  lib.doSomething = () => {}
  return lib
}


 function add5(x: number, y?:number) {
  return y ? x + y : x
 }

 add5(1)


 function add6(x: number, y=0, z: number, q=1) {
   return x + y + z + q
 }


 add6(1,undefined, 3)


 function add7(x: number, ...y: number[]) {
   return x + y.reduce((pre, cur)=> pre + cur)
 }

 // 函数的重载
function add8(...rest: number[]): number
function add8(...rest: string[]): string
function add8(...rest: any[]): any {
  let first = rest[0]
  if(typeof first === 'string') return rest.join('')
  if(typeof first === 'number') return rest.reduce((pre, cur) => pre + cur)
}


// TS中的类
class Dog {
  name: string
  constructor(name: string) {
    this.name = name
  }
  run() {}
}

let dog  = new Dog('豆豆')


// 抽象类
// 可以抽离事物的共性，有利于维护和扩展
abstract class Animal {
  eat() {
    console.log('eat')
  }
  abstract sleep(): void
}


class Dog2 extends Animal {
  name: string
  constructor(name: string) {
    super()
    this.name = name
  }
  run() {}
  sleep() {
    console.log('dog sleep in night')
  }
}

let dog2 = new Dog2('包子')
dog2.eat()


class Cat extends Animal {
  sleep(): void {
    console.log('Cat sleep in day')
  }
}

let cat = new Cat()

// 多态
let animals:Animal[] = [cat, dog2]
animals.forEach(i=> {
  i.sleep()
})


class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}

// 方法的链式调用
new WorkFlow().step1().step2()

class MyFlow extends WorkFlow {
  next() {
    return this
  }
}

new MyFlow().next().step1().next().step2()


// 抽象类与多态
// 接口只能定义类的公有成员，不能定义私有成员
// 接口不能约束类的构造函数
interface Human {
  name: string
  eat(): void
}


class Asian implements Human {
  name: string
  constructor(name: string) {
    this.name = name
  }
  eat() {}
  sleep() {}
}

// 接口的继承
interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man, Child {

}


let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}


// 接口继承类
// 接口可以抽离类的成员（包括公有、私有和受保护成员）
class Auto {
  state: 1
  private state2 = 0
}


interface AutoInterface extends Auto {

}

// ❌实现
// C不是Auto的子类，不能包含Auto的私有成员
class C implements AutoInterface {
  state: 1
}

class Bus extends Auto implements AutoInterface {
  // Bus是Auto的子类，不必实现state
}

// 泛型

// 一个打印函数
// function log(value: string): string {
//   console.log(value)
//   return value 
// } 

// 函数的重载
function log(value: string): string
function log(value: string[]): string[]
function log(value: any) {
  console.log(value)
  return value
}

// 泛型函数-参数
function log2<T>(value: T): T{
  console.log(value)
  return value
}


log2<string[]>(['2','3'])
log2(['2','3'])


// 定义泛型函数类型
type Log = <T>(value: T) => T
let myLog: Log = log2

// 泛型接口
interface Log2 {
  <T>(value: T): T
}

// 接口内均可以访问泛型T
// 默认类型string
interface Log3<T = string> {
  (value: T): T
}

let myLog2: Log2 = log2
let myLog3: Log3<number[]> = log2


// 类型兼容性
let s: string = 'a'
s = null


// 接口兼容性
interface X {
  a: any
  b: any
}

interface Y {
  a: any
  b: any
  c: any
}

let x: X = { a:1,b:2 }
let y: Y = { a:1,b:2,c:3 }
x = y
y = x // y不能赋值x，鸭式类型


// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}

// 1.参数的个数,参数个数要小于目标参数
let handler1 = (a: number)=>{}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
hof(handler2)

// 可选参数和剩余参数
let a = (p1: number, p2: number) => {}
let b = (p1?:number, p2?:number) => {}
let c = (...args: number[]) => {}

// 固定参数兼容可选参数和剩余参数
a = b
a = c

// 可选参数不兼容固定参数和剩余参数  // 关闭strictFunctionTypes可兼容
b = c
b = a

// 剩余参数可以兼容固定参数和可选参数
c = a
c = b


// 2. 参数类型必须要匹配
let handler3 = (a: string) => {}
hof(handler3)

interface Point3D {
  x: number
  y: number
  z: number
}

interface Point2D {
  x: number
  y: number
}

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}

// p3d兼容p2d
p3d = p2d

// p2d不兼容p3d
p2d = p3d


// 3.返回值类型
let f = () => ({name: 'Alice'})
let g = () => ({name: 'Alice', location: 'Beijing'})

f = g
// g不兼容f
g = f


// 函数的重载
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any{

}


// 枚举兼容性
enum Fruit {
  Apple,
  Banana
}
enum Color {
  Red,
  Yellow
}

// 枚举和number之间兼容
let fruit: Fruit.Apple = 1
let no: number = Fruit.Apple

// 枚举和枚举之间不兼容
let color: Color.Red = Fruit.Apple


// 类的兼容性
// 静态成员和构造函数不参与比较
class A {
  constructor(p: number, q: number) {}
  id: number = 1
  private name: string // 私有成员导致实例不兼容
}

class B {
  static s = 1
  constructor(p: number) {}
  id: number = 2
  private name: string // 私有成员导致实例不兼容
}

let aa = new A(1,2)
let bb = new B(1)

aa = bb
bb = aa


class CC extends A {}
let cc = new CC(1,2)
aa = cc
cc = aa


// 泛型的兼容性
interface Empty<T> {
  value: T
}

let obj1: Empty<number> = {
  value: 1
}
let obj2: Empty<string> = {
  value: 'aaa'
}

obj1 = obj2
obj2 = obj1


let log11 = <T>(x: T):T => {
  console.log('x')
  return x
} 

let log22 = <U>(x: U):U => {
  console.log('y')
  return x
}

log11 = log22

// 结构间的兼容：成员少的兼容成员多的
// 函数间的兼容：参数多的兼容参数少的


// 类型保护
// 特定的区域块中保证变量属于某种确定的类型
// 判断某个类型
// 1. instanceof
// 2. in（判断对象的属性）
// 3. typeof
// 4. 自定义类型保护
// 5. 链判断符(访问属性 ?.)

// 自定义类型保护
// parameterName is Type
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

