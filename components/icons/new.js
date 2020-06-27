import React from 'react'

//className is to allow styles to be passed to the component
const NewIcon = ({className, color}) => (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill={color || '#fff'} xmlns="http://www.w3.org/2000/svg">
        <rect x="12" width="4" height="28" />
        <rect y="16" width="4" height="28" transform="rotate(-90 0 16)" />
    </svg>
)

export default NewIcon
