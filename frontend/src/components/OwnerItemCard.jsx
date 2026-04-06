import axios from 'axios';
import React from 'react'
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';
function OwnerItemCard({data}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleDelete=async () => {
      try {
        const result=await axios.get(`${serverUrl}/api/item/delete/${data._id}`,{withCredentials:true})
        dispatch(setMyShopData(result.data))
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='flex bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100 hover:border-[#ff4d2d]/30 transition-all duration-300 w-full group'>
      <div className='w-36 sm:w-48 flex-shrink-0 bg-gray-50 overflow-hidden relative'>
        <img src={data.image} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'/>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent to-black/10'></div>
      </div>
      <div className='flex flex-col justify-between p-4 sm:p-5 flex-1 bg-gradient-to-r from-white to-orange-50/20'>
          <div>
            <h2 className='text-lg font-bold text-gray-900 mb-1 group-hover:text-[#ff4d2d] transition-colors'>{data.name}</h2>
            <div className='flex flex-col gap-0.5 text-sm mb-3'>
              <p><span className='font-semibold text-gray-400 text-xs uppercase tracking-wider mr-1'>Category:</span> <span className='text-gray-700 font-medium'>{data.category}</span></p>
              <p><span className='font-semibold text-gray-400 text-xs uppercase tracking-wider mr-1'>Type:</span> <span className='text-gray-700 font-medium'>{data.foodType}</span></p>
            </div>
          </div>
          <div className='flex items-center justify-between border-t border-gray-100 pt-3'>
            <div className='text-[#ff4d2d] font-extrabold text-xl'>₹{data.price}</div>
            <div className='flex items-center gap-2'>
              <div className='p-2 cursor-pointer rounded-xl bg-orange-50 hover:bg-[#ff4d2d] text-[#ff4d2d] hover:text-white shadow-sm transition-all duration-300 active:scale-95' onClick={()=>navigate(`/edit-item/${data._id}`)}>
                <FaPen size={14}/>
              </div>
              <div className='p-2 cursor-pointer rounded-xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white shadow-sm transition-all duration-300 active:scale-95' onClick={handleDelete}>
                <FaTrashAlt size={14}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default OwnerItemCard
