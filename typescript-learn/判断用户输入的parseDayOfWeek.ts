namespace 判断用户输入的parseDayOfWeek{

  enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
  }
  
  enum InputError {
    OK,
    NoInput,
    Invalid
  }
  
  class Result {
    error: InputError
    value: DayOfWeek
  
    constructor(error: InputError, value: DayOfWeek) {
      this.error = error
      this.value = value
    }
  }
  
  // 我们想要记录用户的输入，是正确的、没有输入、还是错误的输入
  // 以下这种实现是可以的。但是不理想：问题在于我们需要检查错误码，但是也许我们会忘记检查，这样就是默认的DayOfWeek，但实际不应该使用这个默认的值
  function parseDayOfWeek(input: string): Result {
    if(input === '') return new Result(InputError.NoInput, DayOfWeek.Sunday)
  
    switch(input.toLowerCase()) {
      case 'sunday':
        return new Result(InputError.OK, DayOfWeek.Sunday)
      case 'monday':
        return new Result(InputError.OK, DayOfWeek.Monday)
      case 'tuesday':
        return new Result(InputError.OK, DayOfWeek.Tuesday)
      case 'wednesday':
        return new Result(InputError.OK, DayOfWeek.Wednesday)
      case 'thursday':
        return new Result(InputError.OK, DayOfWeek.Thursday)
      case 'friday':
        return new Result(InputError.OK, DayOfWeek.Friday)
      case 'saturday':
        return new Result(InputError.OK, DayOfWeek.Saturday)
      default:
        return new Result(InputError.Invalid, DayOfWeek.Sunday)
    }
  }
  

}
