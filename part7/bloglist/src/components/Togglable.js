import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div className="my-3" style={hideWhenVisible}>
        <button
          className="mx-1 mt-1 rounded bg-green-500 px-1 py-0.5 hover:bg-green-600"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button
          className="my-1 mx-1 w-full rounded-lg bg-gray-600 px-4 py-1 text-center text-sm text-white hover:bg-gray-700 sm:w-auto"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable

