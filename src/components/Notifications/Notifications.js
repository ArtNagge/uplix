import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'

import s from './styles.scss'
import './ReactToastify.css'

class Notifications extends Component {
  render() {
    return (
      <div className={s.notif_container}>
        <ToastContainer
          position="top-right"
          closeButton={false}
          hideProgressBar={false}
          autoClose={3000}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover
        />
      </div>
    )
  }
}

export default Notifications
