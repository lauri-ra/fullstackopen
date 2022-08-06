const Notification = ({message, errorStatus}) => {
    if(message === null) {
        return null
    }

    if(errorStatus === true) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    else {
        return (
            <div className="noti">
                {message}
            </div>
        )
    }
}

export default Notification