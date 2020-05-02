import React from 'react'
import { Redirect } from 'react-router-dom'

class AuthCheck extends React.Component {
  render() {
    return this.props.children // : <Redirect to="/" />
  }
}
export default AuthCheck
