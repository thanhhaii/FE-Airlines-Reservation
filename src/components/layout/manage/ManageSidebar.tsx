/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink, useHistory } from "react-router-dom"
import MetisMenu from "@metismenu/react"
import { useAppDispatch } from "src/state/hooks"
import { userIdentify } from "src/state/userSlice"

const SideBarManage = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(userIdentify(null))
    sessionStorage.clear()
    history.replace("/")
  }

  return (
    <div className="position-fixed h-100 sidebar start-0 top-0">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
        style={{ width: "280px" }}>
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4 fw-bold">tr.vl+</span>
        </Link>
        <hr />
        <MetisMenu>
          <li>
            <NavLink to="/admin/manage-airline">Airline</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-city">City - Airport</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-flight">Flight</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-plane">Plane</NavLink>
          </li>
        </MetisMenu>
        <hr />
        <div className="dropdown">
          <button className="btn btn-transparent shadow-none text-white">
            Log out{" "}
            <i className="fa fa-sign-out" aria-hidden="true" onClick={logOut} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBarManage
