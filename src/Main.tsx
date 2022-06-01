import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { Provider } from "react-redux"
import store from "./state/store"
import Bootstrap from "./components/bootstrap"
import "bootstrap/dist/js/bootstrap"

export function Main() {
  return (
    <Provider store={store}>
      <Bootstrap>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Bootstrap>
    </Provider>
  )
}
