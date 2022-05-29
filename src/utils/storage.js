export const setItem = (key, value) => {
  if (typeof value === 'object') { value = JSON.stringify(value) }
  window.localStorage.setItem(key, value)
}
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    //   如果能转换成对象就转，转不了抛出错误，由 catch 执行返回
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
