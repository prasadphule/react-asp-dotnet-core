import { setSpinner } from 'app/appSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'

export default function AxiosInterceptor({ children }) {

  const dispatch = useDispatch()
  //request interceptor
  const requestHandler = (request) => {
    dispatch(setSpinner(true))
    request.baseURL = process.env.REACT_APP_SAMPLE_BASE_URL
    request.headers.post["Content-Type"] = "application/json"
    return request
  }

  axios.interceptors.request.use((request) => requestHandler(request))

  //response interceptor
  const errorHandler = (error) => {
    dispatch(setSpinner(false))
    return Promise.reject({ ...error })
  }

  const successHandler = (response) => {
    dispatch(setSpinner(false))
    return response
  }

  axios.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  )

  return children
}