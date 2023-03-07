// 交叉类型与联合类型
interface DogInterface {
  run(): void
}

interface CatInterface {
  jump(): void
}

let pet: DogInterface & CatInterface = {
  run() {},
  jump() {}
}

class Dog implements DogInterface {
  run() {}
  eat() {}
}

class Cat implements CatInterface {
  jump() {}
  eat() {}
}

enum Master { Boy, Girl }

function getPet(master: Master) {
  let pet = master === Master.Boy ? new Dog() : new Cat()
  if(pet instanceof Dog) pet.eat()
  else pet.jump()
  return pet
}

interface Square {
  kind: 'square'
  size: number
}

interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

interface Circle {
  kind: 'circle',
  r: number
}

type Shape = Square | Rectangle | Circle

function area(s: Shape): number {
  switch(s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.width * s.height
    case 'circle':
      return Math.PI * s.r ** 2
    default:
      return ((e: never) => {throw new Error(e)})(s) // 如果有分支没有覆盖，则e是never，s报错
  }
}


// 索引类型
let obj = {
  a: 1,
  b: 2,
  c: 3
}

function getValues(obj: any, keys: string[]) {
  return keys.map(key=> obj[key])
}

// 索引类型操作符 keyof T
interface Obj {
  a: number,
  b: string
}

let key: keyof Obj

// T[K]

let value: Obj['a']

// 泛型约束 T extends U
function getValues2<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key=> obj[key])
}



// 映射类型
interface Obj2 {
  a: string
  b: number
  c: boolean
}

// 同态
type ReadonlyObj2 = Readonly<Obj2>
type PartialObj2 = Partial<Obj2>
type PickObj2 = Pick<Obj2, 'a' | 'b'> 

// 映射
type RecordObj2 = Record<'x' | 'y', Obj2>

let rdObj2: RecordObj2 = {
  'x': {a:'',b:2,c:true},
  'y': {a:'',b:2,c:false}
}


// 条件类型
// T extends U ? X : Y
type TypeName<T> = 
  T extends string ? 'string' :
    T extends number ? 'number' :
      T extends boolean ? 'boolean' :
        T extends undefined ? 'undefined' :
          T extends Function ? 'function' :
            'object'

type T1 = TypeName<string>
type T2 = TypeName<string[]>

// (A | B) extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y)

type T3 = TypeName<string | string[]>

type Diff<T, U> = T extends U ? never : T
type T4 = Diff<'a'|'b'|'c', 'a' | 'e'>
// Diff<'a', 'a' | 'e'> Diff<'b', 'a' | 'e'> Diff<'c', 'a' | 'e'>

type NotNull<T> = Diff<T, undefined | null> 
type T5 = NotNull<string | number | undefined | null>


// Diff ---> Exclude // 在前一个中排除有后一个的类型
// NotNull ---> NonNullable<T>
// Extract<T, U> // 在前一个中，抽取有后一个的类型
type T6 = Extract<'a'|'b'|'c', 'a' | 'e'>

// ReturnType<T> // 获取函数返回值类型

type T7 = ReturnType<()=> string>
