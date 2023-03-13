enum TextProcessingMode {
  Text,
  Marker,
  Code
}

class TextProcessor {
  private mode: TextProcessingMode = TextProcessingMode.Text
  private result: string[] = []
  private codeSample: string[] = []

  // 处理文本
  processText(lines: string[]): string[] {
    this.result = []
    this.mode = TextProcessingMode.Text

    for(let line of lines) {
      this.processLine(line)  // 处理每一行文本
    }

    return this.result  // 返回结果数组
  }

  private processLine(line: string): void {
    switch(this.mode) { // 根据当前状态调用不同的处理程序
      case TextProcessingMode.Text:
        this.processTextLine(line)
        break
      case TextProcessingMode.Marker:
        this.processMarkerLine(line)
        break
      case TextProcessingMode.Code:
        this.processCodeLine(line)
        break
    }
  }

   // 处理一行文本，如果文本以"<!--"开头，则加载代码示例，并转移到下一个状态
   private processTextLine(line: string): void {
    this.result.push(line)

    if(line.startsWith("<!--")) {
      this.loadCodeSample(line)

      this.mode = TextProcessingMode.Marker
    }
  }

  // 处理标记，如果文本行以"```ts"开头，则内联代码示例，并转移到下一个状态
  private processMarkerLine(line: string): void {
    this.result.push(line)

    if(line.startsWith("```ts")) {
      this.result = this.result.concat(this.codeSample)

      this.mode = TextProcessingMode.Code
    }
  }

  // 通过跳过文本行来处理代码，如果文本行以“```”开头，则转移到文本处理状态
  private processCodeLine(line: string): void {
    if(line.startsWith("```")) {
      this.result.push(line)

      this.mode = TextProcessingMode.Text
    }
  }

  private loadCodeSample(line: string) {
    /* 省略 */
  }
}
