import PropTypes from 'prop-types'

export const userType = PropTypes.shape({
  name: PropTypes.string,
  uid: PropTypes.string,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
})

export const styleTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
])

export const linkTypes = PropTypes.arrayOf(
  PropTypes.shape({
    route: PropTypes.string,
    dictionary: PropTypes.string,
  })
).isRequired

// export const anyTypes = PropTypes.arrayOf(
//   PropTypes.oneOfType([
//     PropTypes.any,
//     PropTypes.shape({
//       route: PropTypes.oneOf(['TRAIN_ROUTE']),
//       dictionary: PropTypes.oneOf(['nav.training']),
//     }),
//   ])
// )
