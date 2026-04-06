import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const { location, isDemo } = useSelector(state => state.map)
  const apiKey = import.meta.env.VITE_GEOAPIKEY

  useEffect(() => {

    // ✅ DEMO MODE → browser location mat use karo
    if (isDemo && location.lat && location.lon) {
      fetchCity(location.lat, location.lon)
      return
    }

    // ✅ NORMAL MODE → browser location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      dispatch(setLocation({ lat: latitude, lon: longitude }))
      fetchCity(latitude, longitude)
    }, (error) => {
      console.log("Geolocation error:", error)
    })

  }, [userData, isDemo, location.lat, location.lon])

  const fetchCity = async (lat, lon) => {
    const result = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`
    )

    const data = result?.data?.results[0]

    dispatch(setCurrentCity(data?.city || data?.county))
    dispatch(setCurrentState(data?.state))
    dispatch(setCurrentAddress(data?.address_line2 || data?.address_line1))
    dispatch(setAddress(data?.address_line2))
  }
}

export default useGetCity
