import React from 'react'

export const Navbar = () => {
  return (
    <div>
      <div className="navbar navbar-dark bg-secondary mb-4 px-4">
        <span className="navbar-brand">

            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            Pedro
        </span>

        <button className="btn btn-danger">
          <i className="fas fa-sign-out"></i>
          &nbsp;
          <span>Salir</span>
        </button>
      </div>
    </div>
  )
}
