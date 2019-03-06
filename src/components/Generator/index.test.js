import React from 'react'
import { mount } from 'enzyme'
import FileSaver from 'file-saver'
import renderer from 'react-test-renderer'
import Generator from './index'

it('renders correctly', () => {
  let tree = renderer.create(<Generator />).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('componentDidMount', () => {
  it('should register listener', () => {
    const map = {}
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback
    })
    const generator = mount(<Generator />)
    generator.instance().onScroll = jest.fn()
    generator.instance().componentDidMount()
    map.scroll({ key: 'scroll' })
    expect(generator.instance().onScroll).toHaveBeenCalled()
  })
})

describe('onTextChange', () => {
  it('should set state if text is a number', () => {
    const generator = mount(<Generator />)
    const inputProps = generator.find('input').props()
    const event = { target: { value: '1' } };
    inputProps.onChange(event)
    expect(generator.instance().state.numberOfGenerations).toEqual('1')
  })
  it('should not set state if text is not a number', () => {
    const generator = mount(<Generator />)
    const inputProps = generator.find('input').props()
    const event = { target: { value: 'a' } };
    inputProps.onChange(event)
    expect(generator.instance().state.numberOfGenerations).toEqual(0)
  })
})

describe('onSortChange', () => {
  it('should sort numbers in ascending order', () => {
    const generator = mount(<Generator />)
    const optionProps = generator.find('select').props()
    const event = { target: { value: 'ascending' } };
    generator.instance().state.numbers = [3,5,6,2,1]
    optionProps.onChange(event)
    expect(generator.instance().state.numbers).toEqual([1,2,3,5,6])
  })
  it('should sort numbers in descending order', () => {
    const generator = mount(<Generator />)
    const optionProps = generator.find('select').props()
    const event = { target: { value: 'descending' } };
    generator.instance().state.numbers = [3,5,6,2,1]
    optionProps.onChange(event)
    expect(generator.instance().state.numbers).toEqual([6,5,3,2,1])
  })
})

describe('onGenerateButtonClick', () => {
  it('should generate numbers', () => {
    const generator = mount(<Generator />)
    generator.instance().state.numberOfGenerations = 2
    const buttonProps = generator.find('button#generate-button').props()
    buttonProps.onClick()
    expect(generator.instance().state.numbers.length).toEqual(2)
  })
})

describe('onDownloadNumbersClicked', () => {
  it('should generate numbers', () => {
    const generator = mount(<Generator />)
    generator.instance().state.numbers = [3,5,6,2,1]
    FileSaver.saveAs = jest.fn()
    generator.instance().onDownloadNumbersClick()
    expect(FileSaver.saveAs).toHaveBeenCalled()
  })
})

describe('onScroll', () => {
  it('should update state accordingly', () => {
    const generator = mount(<Generator />)
    document.body.scrollTop = 100
    document.documentElement.scrollTop = 100
    generator.instance().onScroll()
    expect(generator.instance().state.showScrollToTop).toEqual(true)

    document.body.scrollTop = 10
    document.documentElement.scrollTop = 10
    generator.instance().onScroll()
    expect(generator.instance().state.showScrollToTop).toEqual(false)

  })
})
