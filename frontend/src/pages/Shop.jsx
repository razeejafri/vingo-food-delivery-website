import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { FaStore } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import FoodCard from '../components/FoodCard';
import { FaArrowLeft } from "react-icons/fa";
function Shop() {
    const {shopId}=useParams()
    const [items,setItems]=useState([])
    const [shop,setShop]=useState([])
    const navigate=useNavigate()
    const handleShop=async () => {
        try {
           const result=await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`,{withCredentials:true}) 
           setShop(result.data.shop)
           setItems(result.data.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
handleShop()
    },[shopId])
  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
        <button className='absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 hover:text-[#ff4d2d] px-4 py-3 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all font-bold group' onClick={()=>navigate("/")}>
            <FaArrowLeft className='group-hover:-translate-x-1 transition-transform' />
            <span>Back</span>
        </button>
        {shop && <div className='relative w-full h-72 md:h-96 lg:h-[450px]'>
          <img src={shop.image} alt="" className='w-full h-full object-cover'/>
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex flex-col justify-end items-center text-center px-4 pb-12'>
            <div className='w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 -mt-10 relative z-10'>
              <FaStore className='text-[#ff4d2d] text-4xl'/>
            </div>
            <h1 className='text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight mb-4'>{shop.name}</h1>
            <div className='flex items-center gap-2 bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10'>
              <FaLocationDot size={18} color='#ff4d2d'/>
              <p className='text-base font-medium text-gray-100'>{shop.address}</p>
            </div>
          </div>
        </div>}

        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 -mt-6'>
            <div className='bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-12 border border-gray-100'>
                <h2 className='flex items-center justify-center gap-4 text-4xl font-extrabold mb-12 text-gray-900 tracking-tight'>
                    <span className='bg-orange-50 p-3 rounded-2xl'><FaUtensils className='text-[#ff4d2d]'/></span> 
                    Our Menu
                </h2>

                {items.length>0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {items.map((item, idx)=>(
                            <FoodCard data={item} key={idx}/>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center py-20'>
                        <div className='text-6xl mb-4 opacity-50'>🍽️</div>
                        <p className='text-center text-gray-500 text-xl font-bold'>No Items Available</p>
                        <p className='text-gray-400 mt-2'>This shop hasn't added any menu items yet.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Shop
