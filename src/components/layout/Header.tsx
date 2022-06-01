/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactNode } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useAppDispatch, useAppSelector, useUser } from "src/state/hooks"
import { isAdmin, userIdentify } from "src/state/userSlice"
import "../../../node_modules/bootstrap/js/src/dropdown"
import styles from "./mainLayout.module.scss"
import "bootstrap/js/src/dropdown"

export interface HeaderComponentProps {
  children?: ReactNode
}

export function HeaderComponent(props: HeaderComponentProps) {
  const user = useUser()
  const isShowManage = useAppSelector(isAdmin)
  const history = useHistory()
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(userIdentify(null))
    sessionStorage.clear()
    history.replace("/")
  }
  return (
    <div
      className={`${styles.header} position-fixed top-0 start-0 bg-white w-100 shadow`}>
      <div className="row justify-content-around h-100">
        <div className="col-3 d-flex align-items-center">
          <NavLink to="/" exact>
            <h1 className="w-auto m-0 fw-bold">tr.vl+</h1>
          </NavLink>
        </div>
        <ul
          className={`${styles.parent__layout} w-auto mb-0 d-flex align-items-center fs-5`}>
          {isShowManage && (
            <li>
              <NavLink to="/admin/manage-airline" exact>
                Manage
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>

          {user ? (
            <>
              <li>
                Hello,&nbsp;
                <NavLink to="/profile" exact>
                  {user.firstName + user.lastName}
                </NavLink>
                !
              </li>
              <li className={styles.logOut} onClick={logOut}>
                Sign Out
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
