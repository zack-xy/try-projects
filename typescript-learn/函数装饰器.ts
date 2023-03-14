namespace 函数装饰器 {
  
  class Widget {}

  type WidgetFactory = () => Widget

  function makeWidget(): Widget {
    return new Widget()
  }

  // singletonDecorator()返回一个lambda
  // 该lambda实现了单例行为，并使用给定工厂创建一个Widget
  function singletonDecorator(factory: WidgetFactory): WidgetFactory {
    let instance: Widget | undefined = undefined

    return (): Widget => {
      if(instance === undefined) {
        instance = factory()
      }
      return instance
    }
  }

  
  function use10Widgets(factory: WidgetFactory) {
    for(let i = 0; i < 10; i++) {
      let widget = factory()
    }
    /* ...... */
  }

  // 因为singletonDecorator()返回一个WidgetFactory
  // 所以可以讲其作为实参传递给use10Widgets
  use10Widgets(singletonDecorator(makeWidget))

}
