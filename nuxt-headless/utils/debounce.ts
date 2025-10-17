export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

export const debounceN = <T extends (this: any, ...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let lastCall = 0
  return function (this: any, ...args: Parameters<T>): void {
    const now = Date.now()
    if (now - lastCall >= delay) {
      func.apply(this, args)
      lastCall = now
    }
  }
}

export const throttleN = <T extends (this: any, ...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let lastCall = 0
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const now = Date.now()
    if (now - lastCall >= delay) {
      func.apply(this, args)
      lastCall = now
    }
  }
}
