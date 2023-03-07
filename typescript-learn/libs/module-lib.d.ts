declare function moduleLib(options: Options): void  // 暴露全局的方法

interface Options {
  [key: string]: any
}

declare namespace moduleLib {
  const version: string
  function doSomething(): void
}

export = moduleLib
