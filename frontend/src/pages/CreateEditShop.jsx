import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';
function CreateEditShop() {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const { currentCity,currentState,currentAddress } = useSelector(state => state.user)
    const [name,setName]=useState(myShopData?.name || "")
     const [address,setAddress]=useState(myShopData?.address || currentAddress)
     const [city,setCity]=useState(myShopData?.city || currentCity)
       const [state,setState]=useState(myShopData?.state || currentState)
       const [frontendImage,setFrontendImage]=useState(myShopData?.image || null)
       const [backendImage,setBackendImage]=useState(null)
       const [loading,setLoading]=useState(false)
       const dispatch=useDispatch()
       const handleImage=(e)=>{
        const file=e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
       }

       const handleSubmit=async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
           const formData=new FormData()
           formData.append("name",name) 
           formData.append("city",city) 
           formData.append("state",state) 
           formData.append("address",address) 
           if(backendImage){
            formData.append("image",backendImage)
           }
           const result=await axios.post(`${serverUrl}/api/shop/create-edit`,formData,{withCredentials:true})
           dispatch(setMyShopData(result.data))
          setLoading(false)
          navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
       }
    return (
        <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] relative min-h-screen overflow-hidden'>
            <div className='absolute top-4 sm:top-10 left-4 sm:left-10 z-[10]'>
                <button className='w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white hover:shadow-md hover:bg-white hover:text-[#ff4d2d] transition-all group active:scale-95' onClick={() => navigate("/")}>
                    <IoIosArrowRoundBack size={32} className='text-gray-600 group-hover:text-[#ff4d2d]' />
                </button>
            </div>

            <div className='max-w-lg w-full bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] p-8 sm:p-10 border border-white animate-fade-in'>
                <div className='flex flex-col items-center mb-8'>
                    <div className='bg-orange-50 p-4 rounded-2xl mb-5 shadow-inner'>
                        <FaUtensils className='text-[#ff4d2d] w-10 h-10 drop-shadow-sm' />
                    </div>
                    <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {myShopData ? "Edit Shop" : "Add Shop"}
                    </div>
                    <p className='text-gray-500 font-medium mt-2'>Manage your shop's basic details.</p>
                </div>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Name</label>
                        <input type="text" placeholder='Enter Shop Name' className='w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-[#ff4d2d] focus:ring-4 focus:ring-orange-500/20 transition-all'
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                        />
                    </div>
                    <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Shop Image bg-gray-50/50</label>
                        <div className='w-full border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-xl relative hover:bg-gray-50 hover:border-gray-300 transition-colors'>
                            <input type="file" accept='image/*' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10' onChange={handleImage} />
                            <div className='p-6 flex flex-col items-center justify-center text-gray-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                                <span className='text-sm font-semibold'>Click to upload image</span>
                            </div>
                        </div>
                        {frontendImage && <div className='mt-4 w-full h-40 overflow-hidden rounded-xl border border-gray-100 shadow-sm'>
                            <img src={frontendImage} alt="" className='w-full h-full object-cover'/>
                        </div>}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                           <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>City</label>
                        <input type="text" placeholder='City' className='w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-[#ff4d2d] focus:ring-4 focus:ring-orange-500/20 transition-all' onChange={(e)=>setCity(e.target.value)}
                        value={city}/> 
                        </div>
                        <div>
                            <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>State</label>
                        <input type="text" placeholder='State' className='w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-[#ff4d2d] focus:ring-4 focus:ring-orange-500/20 transition-all' onChange={(e)=>setState(e.target.value)}
                        value={state}/> 
                        </div>
                    </div>
                    <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Address</label>
                        <input type="text" placeholder='Enter Shop Address' className='w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-[#ff4d2d] focus:ring-4 focus:ring-orange-500/20 transition-all' onChange={(e)=>setAddress(e.target.value)}
                        value={address}/> 
                    </div>
                    
                    <button className='w-full bg-[#ff4d2d] text-white px-6 py-4 rounded-xl font-bold shadow-xl shadow-[#ff4d2d]/30 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 transition-all duration-300 active:scale-95 mt-4 flex items-center justify-center' disabled={loading}>
                        {loading ? <ClipLoader size={20} color='white'/> : "Save Shop Details"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateEditShop
