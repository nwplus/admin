

export default ({ className, icon, color }) => {
    return (
        <i className={'fas fa-' + icon + ' ' + className} style={{ color }} />
    )
}