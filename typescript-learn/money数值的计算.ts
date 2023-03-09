// 因为精度问题，对于money的处理
// 将美元和美分作为一对值进行处理

class Currency {
  private dollars: number 
  private cents: number

  constructor(dollars: number, cents: number) {
    if(!Number.isSafeInteger(dollars)) 
      throw new Error('Cannot safely represent dollar amount')

    if(!Number.isSafeInteger(cents))
      throw new Error('Cannot safely represent cents amount')

    this.dollars = dollars
    this.cents = cents
  }

  getDollars(): number {
    return this.dollars
  }

  getCents(): number {
    return this.cents
  }
}

// 现在还是有问题的，注意每100美分等于1美元
function add(currency1: Currency, currency2: Currency): Currency {
  return new Currency (
    currency1.getDollars() + currency2.getDollars(),
    currency1.getCents() + currency2.getCents()
  )
}

// 使用machine epsilon判断浮点数是否相等

function epsilonEqual(a: number, b: number): boolean {
  return Math.abs(a-b) <= Number.EPSILON
}
