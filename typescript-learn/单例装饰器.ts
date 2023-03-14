class Widget {

}

interface IWidgetFactory {
    makeWidget(): Widget
}

class WidgetFactory implements IWidgetFactory {
  public makeWidget(): Widget {
      return new Widget()
  }
}

class SingletonDecorator implements IWidgetFactory {
  private factory: IWidgetFactory
  private instance: Widget | undefined = undefined

  constructor(factory: IWidgetFactory) {
    this.factory = factory
  }

  // 实现了单例逻辑，并且确保只会创建一个Widget
  public makeWidget(): Widget {
      if(this.instance === undefined) {
        this.instance = this.factory.makeWidget()
      }

      return this.instance
  }
}
