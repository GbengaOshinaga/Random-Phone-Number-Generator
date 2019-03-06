import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import List from './index'

it('renders correctly', () => {
  const tree = renderer.create(<List data={[1]} />).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('componentDidMount', () => {
  it('should register listener', () => {
    const map = {}
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback
    })
    const list = mount(<List data={[]} />)
    list.instance().onEndReached = jest.fn()
    list.instance().componentDidMount()
    map.scroll({ key: 'scroll' })
    expect(list.instance().onEndReached).toHaveBeenCalled()
  })
})

it('onEndReached', () => {
  const list = mount(<List data={[]} />)
  list.instance().onEndReached()
  expect(list.instance().state.numberToRender).toEqual(50)
})

