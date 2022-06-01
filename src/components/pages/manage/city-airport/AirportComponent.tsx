import { useState } from "react"
import Pagination from "src/components/common/Pagination"
import { City } from "src/models"
import { Airport, AirportRequest } from "src/models/Airport"
import ModalAirport from "./ModalAirport"

export interface AirportComponentProps {
  airport: Airport[] | undefined
  currentPage: number
  goToPage: (value: number) => void
  totalPage: number[]
  search: (value: string) => void
  createAirport: (value: AirportRequest) => Promise<boolean>
  updateAirport: (id: number, value: AirportRequest) => Promise<boolean>
  listCity: City[] | undefined
}

export default function AirportComponent(props: AirportComponentProps) {
  const {
    airport,
    totalPage,
    currentPage,
    goToPage,
    search,
    createAirport,
    updateAirport,
    listCity,
  } = props
  const [currentAirport, setCurrentAirport] = useState<Airport | null>(null)
  const handleSearch = (e: any) => {
    search(e.target.value)
  }

  return (
    <div>
      <ModalAirport
        currentAirport={currentAirport}
        createAirport={createAirport}
        updateAirport={updateAirport}
        listCity={listCity}
      />
      <div className="bg-white shadow rounded p-3">
        <div className="d-flex justify-content-between px-3 align-items-center">
          <p className="text-center fw-bold fs-4 mb-0 d-inline-block">Airport</p>
          <button
            type="button"
            className="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#airportModal"
            onClick={() => setCurrentAirport(null)}>
            ADD NEW AIRPORT
          </button>
        </div>
        <hr className="my-1" />
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          onChange={handleSearch}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Airport Name</th>
              <th scope="col">City Name</th>
              <th scope="col">Country Name</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {airport?.map((airport, i) => (
              <tr key={i}>
                <td>{airport.airportName}</td>
                <td>{airport.cityName}</td>
                <td>{airport.countryName}</td>
                <td>
                  <button
                    className="btn btn-transparent p-0 shadow-none mx-3"
                    title="Edit"
                    data-bs-toggle="modal"
                    data-bs-target="#airportModal"
                    onClick={() => setCurrentAirport(airport)}>
                    <i className="fa fa-pencil" aria-hidden="true" />
                  </button>
                  <button className="btn btn-transparent p-0 shadow-none">
                    <i className="fa fa-trash fw-normal" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  )
}
