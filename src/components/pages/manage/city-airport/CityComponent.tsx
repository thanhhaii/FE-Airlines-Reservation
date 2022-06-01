import { useState } from "react"
import Pagination from "src/components/common/Pagination"
import { City } from "src/models"
import ModalCity from "./ModalCity"

export interface CityComponentProps {
  cities: City[] | undefined
  totalPage: number[]
  currentPage: number
  goToPage: (value: number) => void
  search: (value: string) => void
  viewChildren: (value: string) => void
  createCity: (value: City) => Promise<boolean>
  updateCity: (value: City) => Promise<boolean>
}

export function CityComponent(props: CityComponentProps) {
  const {
    cities,
    totalPage,
    currentPage,
    goToPage,
    search,
    viewChildren,
    createCity,
    updateCity,
  } = props
  const [currentCity, setCurrentCity] = useState<City | null>(null)
  const handleSearch = (e: any) => {
    search(e.target.value)
  }

  return (
    <div>
      <ModalCity
        currentCity={currentCity}
        createCity={createCity}
        updateCity={updateCity}
      />
      <div className="bg-white shadow rounded p-3">
        <div className="d-flex justify-content-between px-3 align-items-center">
          <p className="text-center fw-bold fs-4 mb-0 d-inline-block">City</p>
          <button
            type="button"
            className="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            ADD NEW CITY
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
              <th scope="col">City Name</th>
              <th scope="col">Country Name</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {cities?.map((city, i) => {
              return (
                <tr key={i}>
                  <td>{city.cityName}</td>
                  <td>{city.countryName}</td>
                  <td>
                    <button
                      className="btn btn-transparent p-0 shadow-none"
                      data-bs-toggle="tooltip"
                      title="View airport"
                      data-bs-placement="top"
                      onClick={() => viewChildren(city.cityName)}>
                      <i
                        className="fa fa-arrow-right fw-normal"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      className="btn btn-transparent p-0 shadow-none mx-3"
                      title="Edit"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setCurrentCity(city)}>
                      <i className="fa fa-pencil" aria-hidden="true" />
                    </button>
                    <button className="btn btn-transparent p-0 shadow-none">
                      <i className="fa fa-trash fw-normal" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            goToPage={goToPage}
          />
        </table>
      </div>
    </div>
  )
}
