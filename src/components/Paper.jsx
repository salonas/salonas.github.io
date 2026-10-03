export default function Paper({ as: Tag = 'div', tilt, className = '', children, ...rest }) {
  const classes = ['paper', tilt === 'l' && 'tl', tilt === 'r' && 'tr', className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
