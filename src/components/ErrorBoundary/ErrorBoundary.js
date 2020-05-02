import React from 'react'

class ErrorBoundary extends React.Component {
  state = { error: false }

  static getDerivedStateFromError(error) {
    return {
      error: true,
    }
  }

  componentDidCatch(error) {
    this.setState({
      error: true,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
