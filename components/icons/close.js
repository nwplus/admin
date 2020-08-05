import React from 'react'
import { COLOR } from '../../constants'

const CloseIcon = ({ className, color }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill={color || COLOR.RED}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M19.3332 2.5335L17.4665 0.66683L9.99984 8.1335L2.53317 0.66683L0.666504 2.5335L8.13317 10.0002L0.666504 17.4668L2.53317 19.3335L9.99984 11.8668L17.4665 19.3335L19.3332 17.4668L11.8665 10.0002L19.3332 2.5335Z'
      fill='#EB5757'
    />
  </svg>
)

export default CloseIcon
