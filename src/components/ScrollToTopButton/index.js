import React from 'react'
import Button from '../Button'
import './styles.css'

class ScrollToTopButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0
    };
  }
    
  scrollStep = () => {
    const { intervalId } = this.state
    const { scrollStepInPx } = this.props
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  }
    
  scrollToTop = () => {
    const { delayInMs } = this.props
    const intervalId = setInterval(this.scrollStep, delayInMs);
    this.setState({ intervalId });
  }
    
  render () {
    const { id } = this.props
    return (
      <Button id={id} className="scroll-button" onClick={this.scrollToTop}>
        <i className='up'></i>
      </Button>
    )
  }
} 

export default ScrollToTopButton