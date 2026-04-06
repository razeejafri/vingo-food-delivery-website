import React from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';
function CartItemCard({data}) {
    const dispatch=useDispatch()
    const handleIncrease=(id,currentQty)=>{
       dispatch(updateQuantity({id,quantity:currentQty+1}))
    }
      const handleDecrease=(id,currentQty)=>{
        if(currentQty>1){
  dispatch(updateQuantity({id,quantity:currentQty-1}))
        }
        
    }
  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group'>
      <div className='flex items-center gap-5'>
        <div className='w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-gray-50 bg-gray-50'>
            <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'/>
        </div>
        <div className='flex flex-col'>
            <h1 className='font-bold text-gray-800 text-[17px] mb-1'>{data.name}</h1>
            <p className='text-sm text-gray-500 font-medium mb-1.5'>₹{data.price} <span className='text-xs text-gray-400'>x</span> {data.quantity}</p>
            <p className="font-bold text-[#ff4d2d] text-lg bg-orange-50 w-max px-2 py-0.5 rounded-lg">₹{data.price * data.quantity}</p>
        </div>
      </div>
      <div className='flex items-center gap-4 bg-gray-50/80 p-2 rounded-xl border border-gray-100'>
        <div className='flex items-center gap-3 bg-white px-2 py-1.5 rounded-lg shadow-sm border border-gray-50'>
            <button className='p-1.5 cursor-pointer bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 hover:text-[#ff4d2d] transition-colors' onClick={()=>handleDecrease(data.id, data.quantity)}>
                <FaMinus size={12}/>
            </button>
            <span className='font-semibold text-gray-800 w-4 text-center'>{data.quantity}</span>
            <button className='p-1.5 cursor-pointer bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 hover:text-[#ff4d2d] transition-colors' onClick={()=>handleIncrease(data.id, data.quantity)}>
                <FaPlus size={12}/>
            </button>
        </div>
        <button className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white hover:shadow-md transition-all duration-300"
            onClick={()=>dispatch(removeCartItem(data.id))}>
            <CiTrash size={20} strokeWidth={1} />
        </button>
      </div>
    </div>
  )
}

export default CartItemCard
