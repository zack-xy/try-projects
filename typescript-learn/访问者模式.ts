namespace 访问者模式 {
    // 背景： 文档包含：段落、图片和表格，想在屏幕渲染并让屏幕阅读器读出 

    class Renderer { /* Rendering methods */  } // 提供了渲染方法，省略
    class ScreenRender { /* Screen reading methods */ }  // 提供了阅读方法，省略

    interface IDocumentItem {
      render(rederer: Renderer): void
      read(screenReader: ScreenRender): void
    }

    // 文档元素实现了IDocumentItem接口，在给定渲染器或屏幕阅读器时，能够绘制自身或者阅读自身
    class Paragraph implements IDocumentItem {
      render(rederer: Renderer): void {
          
      }

      read(screenReader: ScreenRender): void {
          
      }
    }

    class Picture implements IDocumentItem {
      render(rederer: Renderer): void {
          
      }

      read(screenReader: ScreenRender): void {
          
      }
    }

    class Table implements IDocumentItem {
      render(rederer: Renderer): void {
          
      }
      read(screenReader: ScreenRender): void {
          
      }
    }

    let doc: IDocumentItem[] = [new Paragraph(), new Table()]
    let renderer: Renderer = new Renderer()

    for(let item of doc) {
      item.render(renderer)
    }

    // 上述实现问题：文档不应该负责渲染和阅读，如果新加一个打印功能
    // 需要更新接口及所有实现类


      interface IVisitor {
        visitParagraph(paragraph: Paragraph2): void
        visitPicture(picutre: Picture2): void
        visitTable(table: Table2): void
      }

      class Renderer2 implements IVisitor {
        visitParagraph(paragraph: Paragraph2): void {
            
        }
        visitPicture(picutre: Picture2): void {
            
        }
        visitTable(table: Table2): void {
            
        }
      }

      class ScreenRender2 implements IVisitor {
        visitParagraph(paragraph: Paragraph2): void {
            
        }
        visitPicture(picutre: Picture2): void {
            
        }
        visitTable(table: Table2): void {
            
        }
      }

      interface IDocumentItem2 {
        accept(visitor: IVisitor): void
      }
      
      class Paragraph2 implements IDocumentItem2 {
        accept(visitor: IVisitor): void {
            visitor.visitParagraph(this)
        }
      }
      
      class Picture2 implements IDocumentItem2 {
        accept(visitor: IVisitor): void {
            visitor.visitPicture(this)
        }
      }
      
      class Table2 implements IDocumentItem2 {
        accept(visitor: IVisitor): void {
            visitor.visitTable(this)
        }
      }
      
      let doc2: IDocumentItem2[] = [new Paragraph2(), new Table2()]
      let renderer2: IVisitor = new Renderer2()
      for(let item of doc2) {
        item.accept(renderer2)
      }
      
      
      // 访问变体
      function visit<T1, T2, T3> (
        variant: Variant<T1, T2, T3>,
        func1: (value: T1) => void,
        func2: (value: T2) => void,
        func3: (value: T3) => void,
      ): void {
        switch(variant.index) {
          case 0: func1(<T1>variant.value);break;
          case 1: func2(<T2>variant.value);break;
          case 2: func3(<T3>variant.value);break;
          default: throw new Error()
        }
      }

      class Renderer3 {
        renderParagraph(paragraph: Paragraph3) {}
        renderPicture(picture: Picture3) {}
        renderTable(table: Table) {}
      }
      
      class ScreenReader {
        readParagraph(paragraph: Paragraph3) {}
        readPicture(picture: Picture3) {}
        readTable(table: Table3) {}
      }
      
      class Paragraph3 {
        // 文档项不再需要一个公共的接口
      }
      
      class Picture3 {
      
      }
      
      class Table3 {
      
      }
      
      let doc3: Variant<Paragraph3, Picture3, Table3>[] = [
        Variant.make1(new Paragraph3()),
        Variant.make3(new Table3())
      ]
      
      let renderer3: Renderer3 = new Renderer3()
      
      for(let item of doc3) {
        visit(
          item, 
          (paragraph: Paragraph3) => renderer3.renderParagraph(paragraph),
          (picture: Picture3) => renderer3.renderPicture(picture),
          (table: Table3) => renderer3.renderParagraph(table)
        )
      }
}
