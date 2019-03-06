import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import ScrollToTopButton from './index'

it('renders correctly', () => {
  const tree = renderer.create(<ScrollToTopButton delayInMs="4" scrollStepInPx="50" />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('calls scrollToTop when clicked', () => {
  const button = mount(<ScrollToTopButton delayInMs="4" scrollStepInPx="50" />)
  const buttonProps = button.find('button.scroll-button').props()
  button.instance().scrollToTop = jest.fn()
  expect(button.instance().state.intervalId).toEqual(0)
  buttonProps.onClick()
  expect(button.instance().state.intervalId).toEqual(4)
})

it('scrollStep', () => {
  const button = mount(<ScrollToTopButton delayInMs="4" scrollStepInPx="50" />)
  window.scroll = jest.fn()
  button.instance().scrollStep()
  expect(window.scroll).toHaveBeenCalled()
})

