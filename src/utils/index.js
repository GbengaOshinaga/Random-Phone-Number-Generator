export const generateNumbers = length => {
  const arrayOfGeneratedNumbers = []
  while (arrayOfGeneratedNumbers.length < length) {
    const num = `0${Math.floor(453676891 + Math.random() * 99981671)}`
    arrayOfGeneratedNumbers.push(num)
  }
  return arrayOfGeneratedNumbers
}

export const hasReachedBottom = element => {
  return element.getBoundingClientRect().bottom <= window.innerHeight
}

export const getNumberOfItemsToRender = (length, initialNumberToRender) => {
  let numberToRender = initialNumberToRender + 10
  if (length < numberToRender) {
    numberToRender = length - 10
  }
  return numberToRender
}

export const getMaxNumber = array => Math.max(...array)

export const getMinNumber = array => Math.min(...array)

export const sortAscending = array => array.sort((a, b) => a - b)

export const sortDescending = array => array.sort((a, b) => b - a)
