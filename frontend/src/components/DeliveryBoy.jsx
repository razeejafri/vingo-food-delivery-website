import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import { useState } from 'react'
import DeliveryBoyTracking from './DeliveryBoyTracking'
import { ClipLoader } from 'react-spinners'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Footer from './Footer'

function DeliveryBoy() {
  const { userData, socket } = useSelector(state => state.user)
  const [currentOrder, setCurrentOrder] = useState()
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [availableAssignments, setAvailableAssignments] = useState(null)
  const [otp, setOtp] = useState("")
  const [todayDeliveries, setTodayDeliveries] = useState([])
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return
    let watchId
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setDeliveryBoyLocation({ lat: latitude, lon: longitude })
        socket.emit('updateLocation', {
          latitude,
          longitude,
          userId: userData._id
        })
      }),
        (error) => {
          console.log(error)
        },
      {
        enableHighAccuracy: true
      }
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }

  }, [socket, userData])


  const ratePerDelivery = 50
  const totalEarning = todayDeliveries.reduce((sum, d) => sum + d.count * ratePerDelivery, 0)



  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true })

      setAvailableAssignments(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true })
      setCurrentOrder(result.data)
    } catch (error) {
      console.log(error)
    }
  }


  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      await getCurrentOrder()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    socket.on('newAssignment', (data) => {
      setAvailableAssignments(prev => ([...prev, data]))
    })
    return () => {
      socket.off('newAssignment')
    }
  }, [socket])

  const sendOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id
      }, { withCredentials: true })
      setLoading(false)
      setShowOtpBox(true)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const verifyOtp = async () => {
    setMessage("")
    try {
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp
      }, { withCredentials: true })
      setMessage(result.data.message)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }


  const handleTodayDeliveries = async () => {

    try {
      const result = await axios.get(`${serverUrl}/api/order/get-today-deliveries`, { withCredentials: true })
      setTodayDeliveries(result.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAssignments()
    getCurrentOrder()
    handleTodayDeliveries()
  }, [userData])
  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] overflow-y-auto pb-12'>
      <Nav />
      <div className='w-full max-w-[800px] flex flex-col gap-6 items-center mt-[100px] px-4'>
        
        <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 flex items-center justify-between w-full border border-white/50 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'>
          <div>
              <p className='text-gray-500 font-medium mb-1'>Welcome back,</p>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-[#ff4d2d] tracking-tight'>{userData.fullName}</h1>
          </div>
          <div className='bg-orange-50 px-4 py-2 rounded-xl border border-orange-100 flex flex-col items-end'>
              <span className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1'>Current Location</span>
              <p className='text-[#ff4d2d] text-xs font-semibold font-mono'>{deliveryBoyLocation?.lat?.toFixed(4)}, {deliveryBoyLocation?.lon?.toFixed(4)}</p>
          </div>
        </div>

        <div className='bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-6 w-full border border-gray-100'>
          <h1 className='text-xl font-bold mb-6 text-gray-900 tracking-tight'>Today Deliveries</h1>

          <div className='bg-gray-50/50 rounded-2xl p-4 border border-gray-100 mb-6'>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={todayDeliveries} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                  <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10}/>
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}}/>
                  <Tooltip 
                    formatter={(value) => [value, "orders"]} 
                    labelFormatter={label => `${label}:00`} 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold'}}
                  />
                  <Bar dataKey="count" fill='#ff4d2d' radius={[4, 4, 0, 0]} maxBarSize={40}/>
                </BarChart>
              </ResponsiveContainer>
          </div>

          <div className='w-full max-w-sm mx-auto p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl text-center border border-green-100'>
            <h1 className='text-sm font-bold text-green-800 uppercase tracking-wider mb-2'>Today's Earnings</h1>
            <span className='text-4xl font-extrabold text-green-600 drop-shadow-sm'>₹{totalEarning}</span>
          </div>
        </div>


        {!currentOrder && <div className='bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] w-full border border-gray-100 mb-6'>
          <h1 className='text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 tracking-tight'>Available Orders</h1>

          <div className='flex flex-col gap-4'>
            {availableAssignments?.length > 0
              ?
              (
                availableAssignments.map((a, index) => (
                  <div className='border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300' key={index}>
                    <div className='mb-4 sm:mb-0'>
                      <p className='text-lg font-bold text-gray-800 mb-1'>{a?.shopName}</p>
                      <p className='text-sm text-gray-600 mb-2 flex items-start gap-1 capitalize'>
                         <span className='font-semibold text-gray-800 shrink-0 mt-0.5'>To:</span> {a?.deliveryAddress.text}
                      </p>
                      <div className='flex items-center gap-2'>
                        <span className='bg-orange-50 text-[#ff4d2d] px-2 py-1 rounded-lg text-xs font-bold'>{a.items.length} items</span>
                        <span className='text-xs text-gray-400 font-medium'>₹{a.subtotal}</span>
                      </div>
                    </div>
                    <button className='bg-[#ff4d2d] text-white px-6 py-2.5 rounded-xl font-semibold shadow-md shadow-[#ff4d2d]/20 hover:bg-[#e64323] transition-colors active:scale-95 w-full sm:w-auto' onClick={() => acceptOrder(a.assignmentId)}>Accept Delivery</button>
                  </div>
                ))
              ) : 
              <div className='py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200'>
                 <p className='text-gray-500 font-medium'>No available orders right now. Scanning for new deliveries...</p>
                 <div className='flex justify-center mt-4'><ClipLoader size={20} color='#ff4d2d' /></div>
              </div>
            }
          </div>
        </div>}

        {currentOrder && <div className='bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full border border-[#ff4d2d]/20'>
          <div className='flex items-center justify-between mb-4 border-b border-gray-100 pb-4'>
             <h2 className='text-xl font-extrabold text-gray-900 flex items-center gap-2'>
                 <span className='w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-lg'>📦</span> 
                 Active Order
             </h2>
             <span className='bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs'>In Progress</span>
          </div>

          <div className='bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100'>
            <p className='font-bold text-gray-800 text-lg mb-1'>{currentOrder?.shopOrder.shop.name}</p>
            <p className='text-sm text-gray-600 font-medium mb-2'>{currentOrder.deliveryAddress.text}</p>
            <p className='text-xs text-gray-500 bg-white px-2 py-1 rounded-lg w-max border border-gray-100 shadow-sm'>
               <span className='font-bold text-gray-800'>{currentOrder.shopOrder.shopOrderItems.length}</span> items | <span className='font-bold text-gray-800'>₹{currentOrder.shopOrder.subtotal}</span>
            </p>
          </div>

          <div className='rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white'>
            <DeliveryBoyTracking data={{
              deliveryBoyLocation: deliveryBoyLocation || {
                lat: userData.location.coordinates[1],
                lon: userData.location.coordinates[0]
              },
              customerLocation: {
                lat: currentOrder.deliveryAddress.latitude,
                lon: currentOrder.deliveryAddress.longitude
              }
            }} />
          </div>

          {!showOtpBox ? 
             <button className='mt-6 w-full bg-green-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-green-500/40 active:scale-[0.98] transition-all duration-300' onClick={sendOtp} disabled={loading}>
                 {loading ? <ClipLoader size={20} color='white' /> : "Arrived - Request OTP"}
             </button> 
          : 
             <div className='mt-6 p-5 border border-orange-100 rounded-2xl bg-orange-50/50 animate-fade-in'>
               <p className='font-bold text-gray-800 mb-3 text-center'>Enter OTP sent to <span className='text-[#ff4d2d] underline decoration-wavy'>{currentOrder.user.fullName}</span></p>
               <input type="text" className='w-full text-center tracking-widest text-lg font-bold border border-orange-200 bg-white px-4 py-3 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-orange-500/20' placeholder='• • • • • •' onChange={(e) => setOtp(e.target.value)} value={otp} maxLength={6} />
               
               {message && <p className={`text-center font-bold text-sm mb-4 ${message.includes("success") || message.includes("Delivered") ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}

               <button className="w-full bg-[#ff4d2d] text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-[#e64323] transition-all duration-300 active:scale-[0.98]" onClick={verifyOtp}>Verify & Complete Delivery</button>
             </div>
          }

        </div>}
      </div>
      <Footer />
    </div>
  )
}

export default DeliveryBoy
