import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
function OrderPlaced() {
    const navigate=useNavigate()
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden'>
      {/* Decorative background blurs */}
      <div className='absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full blur-[100px] opacity-50 pointer-events-none'></div>
      <div className='absolute bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full blur-[100px] opacity-40 pointer-events-none'></div>
      
      <div className='bg-white/80 backdrop-blur-2xl p-10 sm:p-14 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-white/60 flex flex-col items-center max-w-lg w-full relative z-10 animate-fade-in'>
          <div className='w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner'>
              <FaCircleCheck className='text-green-500 text-6xl drop-shadow-sm'/>
          </div>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-4 tracking-tight'>Order Placed!</h1>
          <p className='text-gray-500 font-medium mb-10 leading-relaxed px-4'>
            Thank you for your purchase! Your delicious food is being prepared.  
            You can track your order status in the <span className='text-gray-800 font-bold'>"My Orders"</span> section.
          </p>
          <button className='w-full bg-[#ff4d2d] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-[#ff4d2d]/30 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 transition-all duration-300 active:scale-95' onClick={()=>navigate("/my-orders")}>
            Track My Order Status
          </button>
      </div>
    </div>
  )
}

export default OrderPlaced

