import React from 'react'
import { hasReachedBottom, getNumberOfItemsToRender } from '../../../utils'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numberToRender: 50
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onEndReached)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onEndReached)
  }

  onEndReached = () => {
    const { data } = this.props
    const { numberToRender } = this.state
    const element = document.getElementById('list')
    if (hasReachedBottom(element)) {
      if (data.length > numberToRender) {
        this.setState({ numberToRender: getNumberOfItemsToRender(data.length, numberToRender) })
      }
    }
  }

  renderNumbers = () => {
    const { data } = this.props
    const { numberToRender } = this.state

    return (
      <ul className="list" id="list">
        {data.filter((number, index) => index < numberToRender).map(number => (
          <li key={number} className="item">{number}</li>
        ))}
      </ul>
    )
  }

  render() {
    const { data } = this.props

    return (
      <div>
        {data.length ? this.renderNumbers() : null}
      </div>
    )
  }
}

export default List