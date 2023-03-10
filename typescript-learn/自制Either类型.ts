namespace 自制Either类型 {
    // Either类型包含2个类型：TLeft和TRight
  // 约定TLeft存储错误类型，TRight存储有效类型

  class Either<TLeft, TRight> {
    private readonly value: TLeft | TRight
    private readonly left: boolean

    private constructor(value: TLeft | TRight, left: boolean) {
      this.value = value
      this.left = left
    }

    isLeft(): boolean {
      return this.left
    }

    getLeft(): TLeft {
      if(!this.isLeft()) throw new Error()
      return <TLeft>this.value
    }

    isRight(): boolean {
      return !this.left
    }

    getRight(): TRight {
      if(!this.isRight()) throw new Error()
      return <TRight>this.value
    }

    static makeLeft<TLeft, TRight>(value: TLeft) {
      return new Either<TLeft, TRight>(value, true)
    }

    static makeRight<TLeft, TRight>(value: TRight) {
      return new Either<TLeft, TRight>(value, false)
    }
  }

  // 使用
  enum DayOfWeek2 {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
  }

  enum InputError2 {
    NoInput,
    Invalid
  }


  // 类型只会是Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday，NoInput，Invalid
  type Result2 = Either<InputError2, DayOfWeek2>

  // 函数要么返回一个结果，要么抛出一个异常，在某些情况中，不能使用异常，优先选择Either类型
  function parseDayOfWeek2(input: string): Result2 {
    if(input === '') return Either.makeLeft(InputError2.NoInput)

    switch(input.toLowerCase()) {
      case 'sunday':
        return Either.makeRight(DayOfWeek2.Sunday)
      case 'monday':
        return Either.makeRight(DayOfWeek2.Monday)
      case 'tuesday':
        return Either.makeRight(DayOfWeek2.Tuesday)
      case 'wednesday':
        return Either.makeRight(DayOfWeek2.Wednesday)
      case 'thursday':
        return Either.makeRight(DayOfWeek2.Thursday)
      case 'friday':
        return Either.makeRight(DayOfWeek2.Friday)
      case 'saturday':
        return Either.makeRight(DayOfWeek2.Saturday)
      default:
        return Either.makeLeft(InputError2.Invalid)
    }
  }

}
