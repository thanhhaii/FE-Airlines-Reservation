import { useLocation } from "react-router-dom"
import classnames from "classnames"

export default function StepComponent() {
  const location = useLocation()
  return (
    <div className="row">
      <div className="col-3">
        <div className="rounded p-3 shadow text-center bg-primary">
          <h5 className="text-white">Step 1</h5>
          <h4 className="text-white mb-0 fw-regular">Find Flight</h4>
        </div>
      </div>
      <div className="col-3">
        <div
          className={classnames("rounded p-3 shadow text-center", {
            "bg-white": location.pathname === "/flight",
            "bg-primary":
              location.pathname === "/customer-information" ||
              location.pathname === "/order-complete",
          })}>
          <h5
            className={classnames("text-dark", {
              "text-white":
                location.pathname === "/customer-information" ||
                location.pathname === "/order-complete",
            })}>
            Step 2
          </h5>
          <h4
            className={classnames("text-dark mb-0 fw-regular", {
              "text-white":
                location.pathname === "/customer-information" ||
                location.pathname === "/order-complete",
            })}>
            Customer Information
          </h4>
        </div>
      </div>
      <div className="col-3">
        <div
          className={classnames("p-3 shadow text-center", {
            "bg-white":
              location.pathname === "/customer-information" ||
              location.pathname === "/flight",
            "bg-primary":
              location.pathname === "/payment" ||
              location.pathname === "/order-complete",
          })}>
          <h5
            className={classnames("text-dark", {
              "text-white":
                location.pathname === "/payment" ||
                location.pathname === "/order-complete",
            })}>
            Step 3
          </h5>
          <h4
            className={classnames("text-dark mb-0 fw-regular", {
              "text-white":
                location.pathname === "/payment" ||
                location.pathname === "/order-complete",
            })}>
            Payment
          </h4>
        </div>
      </div>
      <div className="col-3">
        <div
          className={classnames(" p-3 shadow text-center", {
            "bg-white": location.pathname !== "/order-complete",
            "bg-primary": location.pathname === "/order-complete",
          })}>
          <h5
            className={classnames("text-dark", {
              "text-white": location.pathname === "/order-complete",
            })}>
            Step 4
          </h5>
          <h4
            className={classnames("text-dark mb-0 fw-regular", {
              "text-white": location.pathname === "/order-complete",
            })}>
            Complete your order
          </h4>
        </div>
      </div>
    </div>
  )
}
