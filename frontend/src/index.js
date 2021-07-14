import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from 'App'
import store from 'app/store'
import reportWebVitals from 'reportWebVitals'
import AxiosInterceptor from 'layout/AxiosInterceptor'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AxiosInterceptor>
        <Router>
          <App />
        </Router>
      </AxiosInterceptor>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
