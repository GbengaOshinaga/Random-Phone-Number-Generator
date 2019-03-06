import { expect } from 'chai'
import {
    generateNumbers,
    getNumberOfItemsToRender,
    getMaxNumber,
    getMinNumber,
    sortAscending,
    sortDescending
} from './index'

describe('generateNumbers', () => {
  it('should return an array of specified length of 10-digit generated numbers', () => {
    const numbers = generateNumbers(10)
    expect(numbers).to.be.an('array')
    expect(numbers.length).to.equal(10)
  })
      
})

describe('getNumberOfItemsToRender', () => {
  it('should return next number to render', () => {
    const numToRender = getNumberOfItemsToRender(100, 50)
    expect(numToRender).to.equal(100)
    const numToRender2 = getNumberOfItemsToRender(95, 50)
    expect(numToRender2).to.equal(95)
  })
})

describe('getMaxNumber', () => {
  it('should return the max number in an array', () => {
    const arr = [1,2,3,4,5]
    expect(getMaxNumber(arr)).to.equal(5)
  })
})

describe('getMinNumber', () => {
  it('should return the min number in an array', () => {
    const arr = [1,2,3,4,5]
    expect(getMinNumber(arr)).to.equal(1)
  })
})

describe('sortAscending', () => {
  it('should sort array in ascending order', () => {
    const arr = [4,3,5,1,2]
    const sortedArr = sortAscending(arr)
    expect(sortedArr[0]).to.equal(1)
    expect(sortedArr[sortedArr.length - 1]).to.equal(5)
  })
})

describe('sortDescending', () => {
  it('should sort array in descending order', () => {
    const arr = [4,3,5,1,2]
    const sortedArr = sortDescending(arr)
    expect(sortedArr[0]).to.equal(5)
    expect(sortedArr[sortedArr.length - 1]).to.equal(1)
  })
})