import { Route, Switch } from "react-router"
import { ManageLayout } from "src/components/layout/manage/ManageLayout"
import ManageAirlineContainer from "./airline"
import ManageCityContainer from "./city-airport"
import ManageFlightContainers from "./flight"
import ManagePlaneContainer from "./plane"

export default function RouterAdmin() {
  return (
    <Switch>
      <ManageLayout>
        <Route path="/admin/manage-airline">
          <ManageAirlineContainer />
        </Route>
        <Route path="/admin/manage-city">
          <ManageCityContainer />
        </Route>
        <Route path="/admin/manage-flight">
          <ManageFlightContainers />
        </Route>
        <Route path="/admin/manage-plane">
          <ManagePlaneContainer />
        </Route>
      </ManageLayout>
    </Switch>
  )
}
