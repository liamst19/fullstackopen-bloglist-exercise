// Libraries ---------------------------------------
import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
// Reducers ----------------------------------------
import { notificationType } from '../reducers/notificationReducer'
// -------------------------------------------------

const Notification = props => {

  const alertVariant = () => {
    switch(props.notification.type){
    case notificationType.INFO:
      return 'success'
    case notificationType.WARNING:
      return 'warning'
    case notificationType.ERROR:
      return 'danger'
    default:
      return 'light'
    }
  }

  const notification = props.notification
  return (notification && notification.type !== notificationType.NULL) ?
    <Alert variant={alertVariant()}>{notification.message}</Alert> : null
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
