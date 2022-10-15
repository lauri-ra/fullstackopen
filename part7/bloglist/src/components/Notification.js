import PropTypes from 'prop-types'

const Notification = ({ message, errorStatus }) => {
  if (message === null) {
    return null
  }

  if (errorStatus === true) {
    return <div className="error">{message}</div>
  } else {
    return <div className="noti">{message}</div>
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  errorStatus: PropTypes.bool.isRequired
}

export default Notification
