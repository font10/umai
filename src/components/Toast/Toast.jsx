import React from 'react'
import { Zoom, toast } from 'react-toastify'

export const Toast = ({ type, message }) => {
  console.log(type)
  console.log(message)
  return (
    <div>
        {
          type === 'success' && toast.success({ message }, {
            position: toast.POSITION.TOP_CENTER,
            className: 'foo-bar text-lg font-medium font-bahnschrift',
            transition: Zoom,
            autoClose: 1500,
            theme: "colored",
          })
        }
        {
          type === 'info' && toast.info('No Image, add one to create a recipe', {
            position: toast.POSITION.TOP_CENTER,
            className: 'foo-bar text-lg font-medium font-bahnschrift',
            transition: Zoom,
            autoClose: 1500,
            theme: "colored",
          })
        }
        {
          type === 'error' && toast.error({ message }, {
            position: toast.POSITION.TOP_CENTER,
            className: 'foo-bar text-lg font-medium font-bahnschrift',
            transition: Zoom,
            autoClose: 1500,
            theme: "colored",
          })
        }
    </div>
  )
}
