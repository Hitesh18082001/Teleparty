import React from 'react';

const UserTable = ({ users }) => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.login}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
