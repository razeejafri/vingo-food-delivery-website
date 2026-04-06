import React, { useState } from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';

function FoodCard({data}) {
const [quantity,setQuantity]=useState(0)
const dispatch=useDispatch()
const {cartItems}=useSelector(state=>state.user)
    const renderStars=(rating)=>{   //r=3
        const stars=[];
        for (let i = 1; i <= 5; i++) {
           stars.push(
            (i<=rating)?(
                <FaStar className='text-yellow-500 text-lg'/>
            ):(
                <FaRegStar className='text-yellow-500 text-lg'/>
            )
           )
            
        }
return stars
    }

const handleIncrease=()=>{
    const newQty=quantity+1
    setQuantity(newQty)
}
const handleDecrease=()=>{
    if(quantity>0){
const newQty=quantity-1
    setQuantity(newQty)
    }
    
}

  return (
    <div className='w-[250px] rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(255,77,45,0.1)] hover:-translate-y-1 overflow-hidden transition-all duration-300 flex flex-col group'>
      <div className='relative w-full h-[180px] flex justify-center items-center bg-gray-50 overflow-hidden'>
        <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm z-10'>
          {data.foodType=="veg" ? <FaLeaf className='text-green-500 text-[16px]'/> : <FaDrumstickBite className='text-red-500 text-[16px]'/>}
        </div>

        <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'/>
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>

      <div className="flex-1 flex flex-col p-4 bg-white z-10">
        <h1 className='font-bold text-gray-800 text-[17px] truncate mb-1'>{data.name}</h1>

        <div className='flex items-center gap-1.5'>
          <div className='flex items-center'>
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className='text-xs text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded-md'>
              {data.rating?.count || 0} reviews
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between mt-auto p-4 pt-0 border-t border-gray-50 bg-white'>
        <div className='flex flex-col'>
          <span className='text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5'>Price</span>
          <span className='font-bold text-[#ff4d2d] text-xl'>
              ₹{data.price}
          </span>
        </div>

        <div className='flex items-center bg-gray-50 rounded-full border border-gray-100 p-1 shadow-sm'>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-[#ff4d2d] hover:shadow-sm transition-all' onClick={handleDecrease}>
            <FaMinus size={10}/>
          </button>
          <span className='w-6 text-center font-semibold text-gray-800 text-sm'>{quantity}</span>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-[#ff4d2d] hover:shadow-sm transition-all' onClick={handleIncrease}>
            <FaPlus size={10}/>
          </button>
          <button className={`ml-2 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${cartItems.some(i=>i.id==data._id) ? "bg-gray-800 text-white shadow-md" : "bg-[#ff4d2d] text-white hover:bg-[#e64323] hover:shadow-lg hover:shadow-[#ff4d2d]/30"}`} onClick={()=>{
              quantity>0?dispatch(addToCart({
                    id:data._id,
                    name:data.name,
                    price:data.price,
                    image:data.image,
                    shop:data.shop,
                    quantity,
                    foodType:data.foodType
          })):null}}>
            <FaShoppingCart size={14}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
