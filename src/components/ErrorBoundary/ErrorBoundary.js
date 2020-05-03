import React from 'react'
import { Redirect } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  state = { error: false }

  static getDerivedStateFromError(error) {
    return {
      error: true,
    }
  }

  handleRedirect() {
    this.setState({
      error: false,
    })

    return <Redirect to="/" />
  }

  componentDidCatch(error) {
    this.setState({
      error: true,
    })
  }

  render() {
    return this.state.error ? this.handleRedirect() : this.props.children
  }
}

export default ErrorBoundary
