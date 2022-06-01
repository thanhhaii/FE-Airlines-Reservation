import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import ProfileComponent from "src/components/pages/profile"
import { MyTicketDetail } from "src/models/Ticket"
import apiService from "src/services/api"
import { useUser } from "src/state/hooks"

export default function ProfilePageContainer() {
  const user = useUser()
  const [myTicket, setMyTicket] = useState<MyTicketDetail[]>()
  const history = useHistory()
  useEffect(() => {
    if (user === null) return
    const getTicket = () => {
      apiService.getMyTicket(user.id).then(resp => {
        setMyTicket(resp)
      })
    }
    getTicket()
  }, [user])

  if (user === null) {
    history.push("/")
    return <></>
  }

  return <ProfileComponent user={user} myTicket={myTicket}/>
}
