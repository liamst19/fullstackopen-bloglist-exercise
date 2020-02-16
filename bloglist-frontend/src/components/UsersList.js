// Libraries ---------------------------------------
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
// Reducers
import { getAllUsers } from '../reducers/userReducer'
// -------------------------------------------------

const UsersList = props => {
  return (<Table>
    <thead>
      <tr>
        <th>name</th>
        <th>blogs created</th>
      </tr>
    </thead>
    <tbody>
      { props.users.map(user =>
        <tr key={user.id}>
          <td><Link to={`/user/${user.id}`}>
            {user.name}
          </Link></td>
          <td>
            {user.blogs.length }
          </td>
        </tr>
      ) }
    </tbody>
  </Table>)
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { getAllUsers }
)(UsersList)