/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
export default ({ className, icon, color, onClick }) => {
  return <i className={`fas fa-${icon} ${className}`} style={{ color }} onClick={onClick} />
}
