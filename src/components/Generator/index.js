import React from 'react'
import FileSaver from 'file-saver'
import Button from '../Button'
import List from './List'
import ScrollToTopButton from '../ScrollToTopButton'
import { 
  generateNumbers,
  getMaxNumber,
  getMinNumber,
  sortAscending,
  sortDescending
} from '../../utils'
import './styles.css'

class Generator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numberOfGenerations: 0,
      numbers: [],
      sortOrder: 'ascending',
      showScrollToTop: false
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const { body, documentElement } = document

    if (body.scrollTop > 40 || documentElement.scrollTop > 40) {
      this.setState({ showScrollToTop: true })
    } else {
      this.setState({ showScrollToTop: false })
    }
  }

  onTextChange = event => {
    const { value } = event.target
    !isNaN(value) && this.setState({ numberOfGenerations: value })
  }

  onSortChange = event => {
    const { numbers } = this.state
    const { value } = event.target

    const sortedNumbers = value === "ascending" ? sortAscending(numbers) : sortDescending(numbers)

    this.setState({ sortOrder: value, numbers: sortedNumbers })
  }

  onGenerateButtonClick = () => {
    const { numberOfGenerations, sortOrder } = this.state
    const numbers = generateNumbers(numberOfGenerations)
    const sortedNumbers = sortOrder === 'ascending' ? sortAscending(numbers) : sortDescending(numbers)
    this.setState({ numbers: sortedNumbers })
  }

  onDownloadNumbersClick = () => {
    const { numbers } = this.state
    const numbersString = numbers.join(', ')

    const blob = new Blob([numbersString], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(blob, 'numbers.txt')
  }

  renderInputSection = () => {
    const { numbers } = this.state

    return (
      <div className="top-container">
        <div className="input-section">
          <input
            className="input"
            autoFocus
            type="number"
            placeholder="Enter number of phone numbers to generate"
            onChange={this.onTextChange}
          />
          <Button id="generate-button" onClick={this.onGenerateButtonClick}>Generate</Button>
        </div>
        {numbers.length 
          ? 
          (
            <Button
             id="download-button"
             className="download-button"
             onClick={this.onDownloadNumbersClick}>
              Download Numbers
             </Button>
          )
          : null}
      </div>
    )
  }

  renderMaxAndMin = () => {
    const { numbers } = this.state
    return numbers.length > 2 ? (
      <div className="max-min">
        <div className="max-num">
          <span className="max">Max Num:</span>
          <span className="num">{`0${getMaxNumber(numbers)}`}</span>
        </div>
        <div className="min-num">
          <span className="min">Min Num:</span> 
          <span className="num">{`0${getMinNumber(numbers)}`}</span>
        </div>
      </div>
    ) : null
  }

  renderSortOptions = () => {
    return (
      <div className="sort">
        <select className="select" onChange={this.onSortChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    )
  }

  renderList = () => {
    const { numbers } = this.state
    return <List data={numbers} />
  }

  renderScrollToTopButton = () => {
    const { showScrollToTop } = this.state
    return showScrollToTop ? 
    (
      <ScrollToTopButton 
        id="scroll-button"
        scrollStepInPx="80"
        delayInMs="3"
      />
      ) : null
  }

  render () {
    return (
      <div className="main">
        {this.renderInputSection()}
        {this.renderSortOptions()}
        {this.renderMaxAndMin()}
        {this.renderList()}
        {this.renderScrollToTopButton()}
      </div>
    )
  }
}

export default Generator
