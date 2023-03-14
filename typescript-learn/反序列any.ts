namespace 反序列化any {

  class User {
    name: string

    constructor(name: string) {
      this.name = name
    }
  }

  // 返回any，丢失name属性
  function deserialize(input: string): any {
    return JSON.parse(input)
  }

  function greet(user: User): void {
    console.log(`Hi ${user.name}`)
  }

  greet(deserialize('{"name":"Alice}'))
  greet(deserialize('{}')) 

}

namespace User的运行时检查 {

  class User {
    name:  string

    constructor(name: string) {
      this.name = name
    }
  }

  function deserialize(input: string): any {
    return JSON.parse(input)
  }

  function greet(user: User): void {
    console.log(`Hi ${user.name}!`)
  }

  function isUser(user: any): user is User {
    if(user === null || user === undefined) return false
    
    return typeof user.name === 'string'
  }

  // 测试使用
  let user: any = deserialize('{"name": "Alice"}')

  if(isUser(user)) greet(user)
  user = undefined
  if(isUser(user)) greet(user)

}
