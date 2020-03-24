import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'

const logoWidth = 40
const logoHeight = 40

class Logo extends React.Component {
  state = {
    transform: '',
    effectScale: 20, // Increase to change maximum angle of 3D effect
    origin: {x: 0, y: 0}, // Center point of the logo
  }

  componentDidMount () {
    const foundBounds = ReactDOM.findDOMNode(this.refs.LogoElement).getBoundingClientRect()
    // Set the origin of
    this.setState({
      origin: {
        x: foundBounds.left + logoWidth / 2,
        y: foundBounds.top + logoHeight / 2,
      },
    })
  }

  onMouseOver = (e) => {
    this.update(e)
    this.forceUpdate()
  }

  onMouseOut = () => {
    this.state.transform = '' // Turn off the effect
    this.forceUpdate()
  }

  onMouseMove = (e) => {
    this.update(e)
    this.forceUpdate()
  }

  update (e) {
    // Find distance of mouse to origin of logo
    // Flip x to move it towards the mouse rather than away
    let x = (e.pageX - this.state.origin.x) * -1
    let y = (e.pageY - this.state.origin.y)
    // Get ratio of distance to total logo dimensions
    x /= (logoWidth + 10)
    y /= (logoHeight + 10)
    // Scale the effect and truncate the values
    x = (x * this.state.effectScale).toFixed(2)
    y = (y * this.state.effectScale).toFixed(2)
    // Change the transform value.
    // The Y value rotates over the 3D X axis, while the X value rotates over the Y axis.
    this.state.transform = `rotateX(${y}deg) rotateY(${x}deg)`
  }

  render () {
    const {classes} = this.props
    return (
      <div>
        <div
          className={classes.container}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut}
          onMouseMove={this.onMouseMove.bind(this)}
          onFocus={this.onMouseOut}
          onBlur={this.onMouseOut}
        >
          <img
            ref="LogoElement"
            src={this.props.logoImage}
            className={classes.logo}
            alt="logo"
            style={{transform: this.state.transform}}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  logoImage: state.configurationReducer.logoImage,
})

const styles = {
  container: {
    filter: 'drop-shadow( 0px 0px 3px rgba(0, 0, 0, 0.5))',
    height: '50px',
    padding: '5px',
    perspective: '30px',
    width: '50px',
  },
  logo: {
    height: logoHeight,
    width: logoWidth,
    cursor: 'pointer',
    transition: 'transform 0.1s',
  },
}

export default withStyles(styles)(connect(mapStateToProps)(Logo))
