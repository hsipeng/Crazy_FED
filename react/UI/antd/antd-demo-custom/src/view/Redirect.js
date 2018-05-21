import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Redirect extends Component {
  componentWillMount() {
    this.props.router.replace(
      this.props.location.query.dest
    )
  }

  render () {
    return null
  }
}

export default withRouter(Redirect)
 