import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from '../components/DeliveryBoyTracking'
import { useSelector } from 'react-redux'
function TrackOrderPage() {
    const { orderId } = useParams()
    const [currentOrder, setCurrentOrder] = useState() 
    const navigate = useNavigate()
    const {socket}=useSelector(state=>state.user)
    const [liveLocations,setLiveLocations]=useState({})
    const handleGetOrder = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })
            setCurrentOrder(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
socket.on('updateDeliveryLocation',({deliveryBoyId,latitude,longitude})=>{
setLiveLocations(prev=>({
  ...prev,
  [deliveryBoyId]:{lat:latitude,lon:longitude}
}))
})
    },[socket])

    useEffect(() => {
        handleGetOrder()
    }, [orderId])
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] pb-16'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 pt-10 flex flex-col gap-8'>
                <div className='flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-sm'>
                    <button className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-all text-gray-600 hover:text-[#ff4d2d] z-[10]' onClick={() => navigate("/")}>
                        <IoIosArrowRoundBack size={28} />
                    </button>
                    <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Track Order</h1>
                </div>

                <div className='flex flex-col gap-8'>
                  {currentOrder?.shopOrders?.map((shopOrder,index)=>(
                    <div className='bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white relative overflow-hidden group' key={index}>
                     <div className='absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full pointer-events-none z-0'></div>
                     <div className='relative z-10 space-y-6'>
                         
                         <div className='border-b border-gray-100 pb-5'>
                            <p className='text-2xl font-extrabold mb-2 text-gray-900 flex items-center gap-2 tracking-tight'>
                                <span className='w-2 h-6 bg-[#ff4d2d] rounded-full'></span>
                                {shopOrder.shop.name}
                            </p>
                            <p className='text-gray-600 font-medium mb-1 flex gap-2'>
                                <span className='text-xs font-bold uppercase tracking-widest text-gray-400 mt-1'>Items</span> 
                                <span>{shopOrder.shopOrderItems?.map(i=>i.name).join(", ")}</span>
                            </p>
                            <p className='flex justify-between items-center bg-gray-50 p-3 rounded-xl mt-3 border border-gray-100'>
                                <span className='text-xs font-bold uppercase tracking-widest text-gray-500'>Subtotal</span> 
                                <span className='font-extrabold text-[#ff4d2d] text-lg'>₹{shopOrder.subtotal}</span>
                            </p>
                            <p className='mt-4 flex gap-2 text-sm'>
                                <span className='text-xs font-bold uppercase tracking-widest text-gray-400 mt-0.5 shrink-0'>Delivery to</span> 
                                <span className='text-gray-700 font-medium'>{currentOrder.deliveryAddress?.text}</span>
                            </p>
                         </div>

                         {shopOrder.status!="delivered" ? <>
                            {shopOrder.assignedDeliveryBoy ?
                            <div className='flex items-center gap-4 bg-orange-50/50 p-4 rounded-2xl border border-orange-100'>
                                <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-xl'>🛵</div>
                                <div>
                                    <p className='text-xs font-bold uppercase tracking-widest text-orange-400 mb-0.5'>Assigned Courier</p>
                                    <p className='font-extrabold text-gray-800 text-lg leading-tight'>{shopOrder.assignedDeliveryBoy.fullName}</p>
                                    <p className='text-gray-500 text-sm font-mono mt-0.5'>{shopOrder.assignedDeliveryBoy.mobile}</p>
                                </div>
                            </div> : 
                            <div className='bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200 text-center'>
                                <p className='font-bold text-gray-500 animate-pulse'>Finding a delivery partner nearby...</p>
                            </div>}
                         </> : 
                            <div className='bg-green-50 px-6 py-4 rounded-2xl border border-green-100 flex items-center gap-3'>
                                <span className='w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold'>✓</span>
                                <p className='text-green-700 font-extrabold text-lg tracking-wide uppercase'>Delivered Successfully</p>
                            </div>
                         }

                         {(shopOrder.assignedDeliveryBoy && shopOrder.status !== "delivered") && (
                          <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative z-10">
                            <DeliveryBoyTracking data={{
                              deliveryBoyLocation:liveLocations[shopOrder.assignedDeliveryBoy._id] || {
                                lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                                lon: shopOrder.assignedDeliveryBoy.location.coordinates[0]
                              },
                              customerLocation: {
                                lat: currentOrder.deliveryAddress.latitude,
                                lon: currentOrder.deliveryAddress.longitude
                              }
                            }} />
                          </div>
                         )}

                     </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    )
}

export default TrackOrderPage
