import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

//set api base url //better to put it in .env file for sample I am using as hardcoded
const requestHandler = (request) => {
  request.baseURL = "https://localhost:5001/v1/";
  request.headers.post["Content-Type"] = "application/json";
  return request;
};

axios.interceptors.request.use((request) => requestHandler(request));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
