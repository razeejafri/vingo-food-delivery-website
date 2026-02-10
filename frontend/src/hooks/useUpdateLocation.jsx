import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { serverUrl } from '../App'

function useUpdateLocation() {
  const { userData } = useSelector(state => state.user)
  const { isDemo } = useSelector(state => state.map)

  useEffect(() => {

    // ❌ Demo mode me real location backend ko mat bhejo
    if (isDemo) return

    const updateLocation = async (lat, lon) => {
      await axios.post(
        `${serverUrl}/api/user/update-location`,
        { lat, lon },
        { withCredentials: true }
      )
    }

    navigator.geolocation.watchPosition((pos) => {
      updateLocation(pos.coords.latitude, pos.coords.longitude)
    })

  }, [userData, isDemo])
}

export default useUpdateLocation
