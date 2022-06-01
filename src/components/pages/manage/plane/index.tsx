import { Airline } from "src/models"
import { PlaneCreate, PlaneDetail } from "src/models/Plane"
import ModalCreatePlane from "./ModalCreatePlane"

export interface ManagePlaneComponentProps {
  plane: PlaneDetail[]
  airline: Airline[]
  createPlane: (value: PlaneCreate) => Promise<boolean>
}

export default function ManagePlaneComponent(props: ManagePlaneComponentProps) {
  const { plane, airline, createPlane } = props
  return (
    <>
      <ModalCreatePlane airline={airline} createPlane={createPlane} />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-12">
            <div className="bg-white rounded p-3 shadow">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Plane Name</th>
                    <th scope="col">Airline Name</th>
                    <th scope="col">Total First Class Chair</th>
                    <th scope="col">Total Business Chair</th>
                    <th scope="col">Total Premium Economy Chair</th>
                    <th scope="col">Total Economy Chair</th>
                  </tr>
                </thead>
                <tbody>
                  {plane.map((plane, i) => (
                    <tr key={i}>
                      <td>{plane.planeName}</td>
                      <td>{plane.airlineName}</td>
                      <td>{plane.totalFirstClassChair}</td>
                      <td>{plane.totalBusinessChair}</td>
                      <td>{plane.totalPremiumEconomyChair}</td>
                      <td>{plane.totalEconomyChair}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-end">
                <button
                  className="btn btn-transparent rounded border"
                  data-bs-toggle="modal"
                  data-bs-target="#modalCreatePlane">
                  Create new plane
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
