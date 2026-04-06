import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { setMyOrders, updateOrderStatus, updateRealtimeOrderStatus } from '../redux/userSlice';


function MyOrders() {
  const { userData, myOrders,socket} = useSelector(state => state.user)
  const navigate = useNavigate()
const dispatch=useDispatch()
  useEffect(()=>{
socket?.on('newOrder',(data)=>{
if(data.shopOrders?.owner._id==userData._id){
dispatch(setMyOrders([data,...myOrders]))
}
})

socket?.on('update-status',({orderId,shopId,status,userId})=>{
if(userId==userData._id){
  dispatch(updateRealtimeOrderStatus({orderId,shopId,status}))
}
})

return ()=>{
  socket?.off('newOrder')
  socket?.off('update-status')
}
  },[socket])



  
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] flex justify-center px-4 pb-16'>
      <div className='w-full max-w-4xl p-4 sm:p-6 mt-6'>

        <div className='flex items-center gap-4 mb-8 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-sm'>
          <button className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-all text-gray-600 hover:text-[#ff4d2d] z-[10]' onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={28} />
          </button>
          <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>My Orders</h1>
        </div>
        
        {myOrders?.length === 0 ? (
            <div className='bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-sm border border-white text-center flex flex-col items-center justify-center mt-10'>
                <div className='w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-4xl'>📦</div>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>No orders yet</h2>
                <p className='text-gray-500 mb-6'>It seems you haven't ordered anything. Let's fix that!</p>
                <button className='bg-[#ff4d2d] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#ff4d2d]/30 hover:bg-[#e64323] transition-all duration-300 active:scale-95' onClick={()=>navigate("/")}>Start Ordering</button>
            </div>
        ) : (
            <div className='space-y-8 animate-fade-in'>
              {myOrders?.map((order,index)=>(
                userData.role=="user" ?
                (
                  <UserOrderCard data={order} key={index}/>
                )
                :
                userData.role=="owner"? (
                  <OwnerOrderCard data={order} key={index}/>
                )
                :
                null
              ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
