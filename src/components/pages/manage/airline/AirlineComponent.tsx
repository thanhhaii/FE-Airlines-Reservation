import React, { useState } from "react"
import { Airline } from "src/models/Airline"
import EditAddAirlineComponent from "./EditAddAirlineComponent"

export interface ManageInformationProps {
  airline: Airline[] | undefined
  onHandleCreate: (airline: Airline) => Promise<boolean>
  onHandleUpdate: (airline: Airline) => Promise<boolean>
  loading: boolean
}

export default function ManageAirlineComponent(props: ManageInformationProps) {
  const { airline, onHandleUpdate, onHandleCreate, loading } = props
  const [editAirline, setEditAirline] = useState<Airline | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)

  const actionForm = (value: Airline | null) => {
    setEditAirline(value)
    setShowForm(true)
  }

  return (
    <div className="container-fluid">
      <div className="row my-4">
        <div className="col-xxl-6">
          <div className="row">
            <div className="text-center p-2 bg-secondary rounded-top">
              <h4 className="mb-0 fw-normal text-white">Airline</h4>
            </div>
            <div className="border rounded-bottom bg-white shadow col-12 pb-3">
              <div className="p-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Airline Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airline !== undefined &&
                      airline?.map((a, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{a?.airlineId}</th>
                            <td>{a.airlineName}</td>
                            <td>
                              <button
                                className="btn btn-primary text-white"
                                onClick={() => actionForm(a)}>
                                Edit
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-6">
          <div className="border rounded bg-white shadow">
            <EditAddAirlineComponent
              closeForm={() => setShowForm(!showForm)}
              airline={editAirline}
              isLoading={loading}
              isShowForm={showForm}
              onHandleUpdate={onHandleUpdate}
              onHandleCreate={onHandleCreate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
