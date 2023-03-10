declare const NsType: unique symbol  // 这一行

class Ns {
  readonly value: number
  [NsType]: void  // 这一行
  constructor(value: number) {
    this.value = value
  }
}
