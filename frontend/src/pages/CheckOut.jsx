import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css"
import { setAddress, setLocation } from '../redux/mapSlice';
import { MdDeliveryDining } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import axios from 'axios';
import { FaMobileScreenButton } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { addMyOrder, setTotalAmount } from '../redux/userSlice';
function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    const map = useMap()
    map.setView([location.lat, location.lon], 16, { animate: true })
  }
  return null

}

function CheckOut() {
  const { location, address } = useSelector(state => state.map)
    const { cartItems ,totalAmount,userData} = useSelector(state => state.user)
  const [addressInput, setAddressInput] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const apiKey = import.meta.env.VITE_GEOAPIKEY
  const deliveryFee=totalAmount>500?0:40
  const AmountWithDeliveryFee=totalAmount+deliveryFee






  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng
    dispatch(setLocation({ lat, lon: lng }))
    getAddressByLatLng(lat, lng)
  }
  const getCurrentLocation = () => {
      const latitude=userData.location.coordinates[1]
      const longitude=userData.location.coordinates[0]
      dispatch(setLocation({ lat: latitude, lon: longitude }))
      getAddressByLatLng(latitude, longitude)
   

  }

  const getAddressByLatLng = async (lat, lng) => {
    try {

      const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)
      dispatch(setAddress(result?.data?.results[0].address_line2))
    } catch (error) {
      console.log(error)
    }
  }

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
      const { lat, lon } = result.data.features[0].properties
      dispatch(setLocation({ lat, lon }))
    } catch (error) {
      console.log(error)
    }
  }

  const handlePlaceOrder=async () => {
    try {
      const result=await axios.post(`${serverUrl}/api/order/place-order`,{
        paymentMethod,
        deliveryAddress:{
          text:addressInput,
          latitude:location.lat,
          longitude:location.lon
        },
        totalAmount:AmountWithDeliveryFee,
        cartItems
      },{withCredentials:true})

      if(paymentMethod=="cod"){
      dispatch(addMyOrder(result.data))
      navigate("/order-placed")
      }else{
        const orderId=result.data.orderId
        const razorOrder=result.data.razorOrder
          openRazorpayWindow(orderId,razorOrder)
       }
    
    } catch (error) {
      console.log(error)
    }
  }

const openRazorpayWindow=(orderId,razorOrder)=>{

  const options={
 key:import.meta.env.VITE_RAZORPAY_KEY_ID,
 amount:razorOrder.amount,
 currency:'INR',
 name:"Vingo",
 description:"Food Delivery Website",
 order_id:razorOrder.id,
 handler:async function (response) {
  try {
    const result=await axios.post(`${serverUrl}/api/order/verify-payment`,{
      razorpay_payment_id:response.razorpay_payment_id,
      orderId
    },{withCredentials:true})
        dispatch(addMyOrder(result.data))
      navigate("/order-placed")
  } catch (error) {
    console.log(error)
  }
 }
  }

  const rzp=new window.Razorpay(options)
  rzp.open()


}


  useEffect(() => {
    setAddressInput(address)
  }, [address])
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] flex items-center justify-center p-4 py-8 sm:p-6'>
      <button className='absolute top-6 left-6 z-[10] w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md hover:bg-white transition-all active:scale-95 group' onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={32} className='text-gray-600 group-hover:text-[#ff4d2d] transition-colors' />
      </button>
      
      <div className='w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white p-6 sm:p-10 space-y-8 animate-fade-in'>
        <div className='flex items-center gap-4 border-b border-gray-100 pb-4'>
            <div className='w-3 h-10 bg-[#ff4d2d] rounded-full'></div>
            <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Checkout</h1>
        </div>

        <section>
          <h2 className='text-xl font-bold mb-4 flex items-center gap-2 text-gray-900'>
             <div className='bg-orange-50 p-2 rounded-lg'><IoLocationSharp className='text-[#ff4d2d]' /></div>
             Delivery Location
          </h2>
          <div className='flex flex-col sm:flex-row gap-3 mb-4'>
            <div className='relative flex-1'>
               <IoSearchOutline className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18}/>
               <input type="text" className='w-full border-2 border-gray-100 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-[#ff4d2d] focus:bg-white transition-all' placeholder='Enter Your Delivery Address..' value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
            </div>
            <div className='flex gap-2 sm:gap-3'>
                <button className='flex-1 sm:flex-none bg-gray-900 hover:bg-[#ff4d2d] text-white px-5 py-3.5 rounded-xl flex items-center justify-center shadow-md transition-colors active:scale-95' onClick={getLatLngByAddress} title="Search Location">
                    <IoSearchOutline size={20} />
                </button>
                <button className='flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-5 py-3.5 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 transition-colors active:scale-95' onClick={getCurrentLocation} title="Use Current Location">
                    <TbCurrentLocation size={20} />
                </button>
            </div>
          </div>
          <div className='rounded-2xl border-2 border-gray-100 overflow-hidden shadow-inner relative'>
            <div className='absolute inset-0 border-4 border-white rounded-2xl pointer-events-none z-20'></div>
            <div className='h-64 sm:h-80 w-full flex items-center justify-center z-10'>
              <MapContainer
                className={"w-full h-full"}
                center={[location?.lat || 20, location?.lon || 78]}
                zoom={location?.lat ? 16 : 4}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {location?.lat && <RecenterMap location={location} />}
                {location?.lat && <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{ dragend: onDragEnd }} />}
              </MapContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-xl font-bold mb-4 text-gray-900'>Payment Method</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className={`cursor-pointer flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${paymentMethod === "cod" ? "border-[#ff4d2d] bg-orange-50/50 shadow-[0_8px_20px_rgba(255,77,45,0.1)]" : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
              }`} onClick={() => setPaymentMethod("cod")}>
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${paymentMethod === "cod" ? "bg-[#ff4d2d] text-white shadow-md shadow-[#ff4d2d]/30" : "bg-green-100 text-green-600"}`}>
                <MdDeliveryDining className='text-2xl' />
              </span>
              <div>
                <p className='font-bold text-gray-900 text-base'>Cash On Delivery</p>
                <p className='text-xs font-medium text-gray-500 mt-0.5'>Pay when your food arrives</p>
              </div>
            </div>
            
            <div className={`cursor-pointer flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50/50 shadow-[0_8px_20px_rgba(255,77,45,0.1)]" : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
              }`} onClick={() => setPaymentMethod("online")}>
              <div className='flex -space-x-2'>
                  <span className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-sm border border-white ${paymentMethod === "online" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"}`}>
                    <FaMobileScreenButton className='text-lg' />
                  </span>
                  <span className={`relative z-0 inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-sm border border-white ${paymentMethod === "online" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}>
                    <FaCreditCard className='text-lg' />
                  </span>
              </div>
              <div>
                <p className='font-bold text-gray-900 text-base'>Pay Online</p>
                <p className='text-xs font-medium text-gray-500 mt-0.5'>UPI / Credit / Debit Card</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-xl font-bold mb-4 text-gray-900'>Order Summary</h2>
          <div className='rounded-2xl border border-gray-100 bg-gray-50/50 p-6 space-y-4 shadow-inner'>
            <div className='space-y-3 max-h-48 overflow-y-auto pr-2' style={{ scrollbarWidth: 'thin' }}>
                {cartItems.map((item,index)=>(
                  <div key={index} className='flex justify-between items-center text-sm'>
                    <div className='flex items-center gap-3'>
                        <span className='w-6 h-6 bg-white border border-gray-200 rounded text-xs flex items-center justify-center font-bold text-gray-600'>{item.quantity}x</span>
                        <span className='font-semibold text-gray-800'>{item.name}</span>
                    </div>
                    <span className='font-bold text-gray-600'>₹{item.price * item.quantity}</span>
                  </div>
                ))}
            </div>
            
            <div className='h-px w-full border-t border-dashed border-gray-300 my-4'></div>
            
            <div className='flex justify-between font-bold text-gray-600'>
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className='flex justify-between font-bold text-gray-600'>
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? "text-green-500" : ""}>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
            </div>
            
            <div className='h-px w-full bg-gray-200 my-2'></div>
            
            <div className='flex justify-between items-center pt-2'>
                <span className='text-lg font-bold text-gray-900'>Total Amount</span>
                <span className='text-3xl font-extrabold text-[#ff4d2d] drop-shadow-sm'>₹{AmountWithDeliveryFee}</span>
            </div>
          </div>
        </section>
        
        <button className='w-full bg-[#ff4d2d] text-white py-4 sm:py-5 rounded-2xl text-lg font-bold shadow-xl shadow-[#ff4d2d]/30 hover:bg-[#e64323] hover:-translate-y-0.5 hover:shadow-[#ff4d2d]/40 transition-all duration-300 active:scale-[0.98]' onClick={handlePlaceOrder}> 
           {paymentMethod=="cod" ? "Confirm & Place Order" : "Proceed to Payment"}
        </button>

      </div>
    </div>
  )
}

export default CheckOut
