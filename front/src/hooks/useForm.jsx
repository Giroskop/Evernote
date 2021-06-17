import { useState } from "react"

export default function useForm(value) {
  const [values, setValues] = useState({})
  function changeHandler(e) {
    setValues(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  return (
    [values, changeHandler, setValues]
  )
}
