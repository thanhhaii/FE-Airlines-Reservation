import { ReactElement } from "react"
import { Route, Switch } from "react-router-dom"
import { MainLayout } from "src/components/layout/MainLayout"
import RouterAdmin from "./admin/routerAdmin"
import HomePageContainer from "./home"
import LoginPageContainer from "./login"
import RegisterPageContainer from "./register"
import ProfilePageContainer from "./profile"
import FlightContainer from "./flight"
import CustomerInformationContainer from "./customer-info"
import PaymentContainer from "./payment"
import OrderCompleteContainer from "./order-complete"

export function RootRouter(): ReactElement {
  return (
    <Switch>
      <Route exact path="/">
        <MainLayout>
          <HomePageContainer />
        </MainLayout>
      </Route>
      <Route path="/login">
        <MainLayout>
          <LoginPageContainer />
        </MainLayout>
      </Route>
      <Route path="/register">
        <MainLayout>
          <RegisterPageContainer />
        </MainLayout>
      </Route>
      <Route path="/profile">
        <MainLayout>
          <ProfilePageContainer />
        </MainLayout>
      </Route>
      <Route path="/flight">
        <MainLayout>
          <FlightContainer />
        </MainLayout>
      </Route>
      <Route path="/customer-information">
        <MainLayout>
          <CustomerInformationContainer />
        </MainLayout>
      </Route>
      <Route path="/payment">
        <MainLayout>
          <PaymentContainer />
        </MainLayout>
      </Route>
      <Route path="/order-complete">
        <MainLayout>
          <OrderCompleteContainer />
        </MainLayout>
      </Route>
      <RouterAdmin />
    </Switch>
  )
}
