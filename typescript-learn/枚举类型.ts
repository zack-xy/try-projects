// 将一周中的各天编码为一个枚举
enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

function isWeekend(dayOfWeek: DayOfWeek): boolean {
  return dayOfWeek === DayOfWeek.Saturday || dayOfWeek === DayOfWeek.Sunday
}

function isWeekday(dayofWeek: DayOfWeek): boolean {
  return dayofWeek >= DayOfWeek.Monday && dayofWeek <= DayOfWeek.Friday
}

// 何时使用枚举
// 每当我们有一小组可能的取值，并且想要以不会导致歧义的方式表示它们时


// 将输入解析为DayOfWeek或undefined
function parseDayOfWeek(input: string): DayOfWeek | undefined {
  switch(input.toLowerCase()) {
    case 'sunday': return DayOfWeek.Sunday
    case 'monday': return DayOfWeek.Monday
    case 'tuesday': return DayOfWeek.Tuesday
    case 'wednesday': return DayOfWeek.Wednesday
    case 'thursday': return DayOfWeek.Thursday
    case 'friday': return DayOfWeek.Friday
    case 'saturday': return DayOfWeek.Saturday
    default: return undefined // 没有匹配返回undefiend
  }
}

function useInput(input: string) {
  let result: DayOfWeek | undefined = parseDayOfWeek(input)

  if(result === undefined) {
    console.log(`Failed to parse "${input}"`)
  } else {
    let dayOfWeek: DayOfWeek = result
    console.log(dayOfWeek)
  }
}
