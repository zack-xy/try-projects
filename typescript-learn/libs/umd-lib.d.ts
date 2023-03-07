import umdLib from "./umd-lib";

declare namespace umdLib {
  const version: string
  function doSomething(): void
}

export as namespace umdLib

export = umdLib
