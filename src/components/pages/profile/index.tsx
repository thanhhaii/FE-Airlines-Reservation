import { format } from "date-fns"
import React, { useState } from "react"
import { User } from "src/models"
import { MyTicketDetail } from "src/models/Ticket"
import ModalViewDetail from "./ModalViewDetail"
import styles from "./profile.module.scss"

export interface ProfileComponentProps {
  user: User
  myTicket: MyTicketDetail[] | undefined
}

export default function ProfileComponent(props: ProfileComponentProps) {
  const { user, myTicket } = props
  const [ticketId, setTicketId] = useState<string>("")
  const caculateTime = (value: MyTicketDetail) => {
    var date1 = new Date(value.timeFlight)
    var date2 = new Date(value.arrivalTime)

    var diff = date2.getTime() - date1.getTime()
    var msec = diff
    var hh = Math.floor(msec / 1000 / 60 / 60)
    msec -= hh * 1000 * 60 * 60
    var mm = Math.floor(msec / 1000 / 60)
    msec -= mm * 1000 * 60
    var ss = Math.floor(msec / 1000)
    msec -= ss * 1000
    return hh + "h:" + mm
  }

  return (
    <>
      <ModalViewDetail ticketId={ticketId} />
      <div className={`${styles.profile} h-100 mt-5`}>
        <div className="container h-100 pt-1">
          <div className="row h-100 g-4 gx-5 mt-3">
            <div className={`${styles.profile__boxUser} col-4`}>
              <div className="row bg-white rounded-3 p-3 shadow">
                <div className="col-12 py-3">
                  <div className={`${styles.avatar} rounded-circle m-auto`}>
                    <img
                      src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <div>
                    <h2 className="fs-3 fw-bold">{`${user.firstName} ${user.lastName}`}</h2>
                    <p className="fs-6 fw-regular mb-2">
                      Username: {user.userName}
                    </p>
                    <p className="fs-6 fw-regular mb-2">
                      Birthday: {format(new Date(user.dob), "dd-MM-yyyy")}
                    </p>
                    <p className="fs-6 fw-regular mb-2">
                      Phone Number: {user.phoneNumber}
                    </p>
                    <p className="fs-6 fw-regular mb-2">Email: {user.email}</p>
                    <button className="btn btn-primary">Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className=" p-3 rounded bg-white shadow">
                <div className="bg-primary text-white p-1 rounded">
                  <h4 className="text-center mb-0">My ticket</h4>
                </div>
                <table className="table table-bordered">
                  <thead className="text-center">
                    <tr>
                      <th className="p-3">Flight</th>
                      <th className="p-3">Airport Go</th>
                      <th className="p-3">Time Flight</th>
                      <th className="p-3">Arrival Airport</th>
                      <th className="p-3">Handle</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {myTicket?.map((t, i) => (
                      <tr key={i}>
                        <td>
                          <p>{t.airlineName}</p>
                          <p>{t.planeName}</p>
                        </td>
                        <td>
                          <p>{t.airportGo}</p>
                          <p>
                            {format(new Date(t.timeFlight), "HH:mm dd/MM/yyyy")}
                          </p>
                        </td>
                        <td>
                          <p>{caculateTime(t)}</p>
                        </td>
                        <td>
                          <p>{t.arrivalAirport}</p>
                          <p>
                            {format(
                              new Date(t.arrivalTime),
                              "HH:mm dd/MM/yyyy",
                            )}
                          </p>
                        </td>
                        <td>
                          <button
                            className="btn btn-transparent shadow-none"
                            data-bs-toggle="modal"
                            data-bs-target="#modalProfile"
                            onClick={() => setTicketId(t.ticketId)}>
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
