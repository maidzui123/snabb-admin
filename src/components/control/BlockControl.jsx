import React from 'react'

const BlockControl = ({ children }) => {
  return (
    <div className="bg-gray-50 gap-2 flex items-center justify-center rounded-lg">
      {children}
    </div>
  )
}

export default BlockControl