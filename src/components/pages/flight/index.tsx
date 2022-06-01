import StepComponent from "src/components/common/Step"
import { FindFlightResponse } from "src/models/Flight"
import styles from "./flight.module.scss"
import FlightDetailComponent from "./FlightDetail"

export interface FlightComponentProps {
  flights: FindFlightResponse[] | undefined
  goToSelect: (value: FindFlightResponse) => void
}

export default function FlightComponent(props: FlightComponentProps) {
  const { flights, goToSelect } = props
  return (
    <div className={styles.flightPage}>
      <div className="container">
        <StepComponent />
        <hr className="shadow my-4" />
        <div className="row">
          {flights?.map((flight, i) => (
            <FlightDetailComponent
              keyFlight={i}
              key={i}
              flight={flight}
              goToSelect={goToSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
