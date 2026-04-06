import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setSearchItems, setUserData } from '../redux/userSlice';
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
function Nav() {
    const { userData, currentCity ,cartItems} = useSelector(state => state.user)
        const { myShopData} = useSelector(state => state.owner)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query,setQuery]=useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchItems=async () => {
      try {
        const result=await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,{withCredentials:true})
    dispatch(setSearchItems(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        if(query){
handleSearchItems()
        }else{
              dispatch(setSearchItems(null))
        }

    },[query])
    return (
        <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[24px] fixed top-0 z-[9999] bg-white/80 backdrop-blur-md shadow-[0_2px_20px_rgb(0,0,0,0.04)] border-b border-gray-100 overflow-visible transition-all duration-300'>

            {showSearch && userData?.role === "user" && <div className='w-[90%] h-[60px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl items-center gap-[15px] flex fixed top-[90px] left-[5%] md:hidden border border-gray-100 animate-fade-in'>
                <div className='flex items-center w-[35%] overflow-hidden gap-[8px] px-[15px] border-r border-gray-200'>
                    <FaLocationDot size={20} className=" text-[#ff4d2d] flex-shrink-0" />
                    <div className='w-full truncate text-gray-600 font-medium text-sm'>{currentCity}</div>
                </div>
                <div className='w-[65%] flex items-center gap-[10px] pr-[15px]'>
                    <IoIosSearch size={22} className='text-[#ff4d2d]' />
                    <input type="text" placeholder='Search delicious food...' className='text-gray-700 outline-none w-full bg-transparent font-medium text-sm placeholder:text-gray-400' onChange={(e)=>setQuery(e.target.value)} value={query}/>
                </div>
            </div>}

            <h1 className='text-3xl font-bold text-[#ff4d2d] tracking-tight cursor-pointer hover:scale-105 transition-transform' onClick={()=>navigate("/")}>Vingo</h1>
            
            {userData?.role === "user" && <div className='md:w-[50%] lg:w-[40%] h-[50px] bg-gray-50/80 hover:bg-white border border-gray-200 hover:border-[#ff4d2d]/30 hover:shadow-md rounded-2xl items-center gap-[15px] hidden md:flex transition-all duration-300 group'>
                <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[15px] border-r border-gray-200'>
                    <FaLocationDot size={18} className="text-[#ff4d2d] flex-shrink-0" />
                    <div className='w-full truncate text-gray-600 font-medium text-sm'>{currentCity}</div>
                </div>
                <div className='w-[70%] flex items-center gap-[10px] pr-[15px]'>
                    <IoIosSearch size={22} className='text-gray-400 group-hover:text-[#ff4d2d] transition-colors' />
                    <input type="text" placeholder='Search delicious food...' className='text-gray-700 outline-none w-full bg-transparent font-medium text-sm placeholder:text-gray-400' onChange={(e)=>setQuery(e.target.value)} value={query}/>
                </div>
            </div>}

            <div className='flex items-center gap-5'>
                {userData?.role === "user" && (showSearch ? 
                    <div className='p-2 bg-gray-100 rounded-full cursor-pointer md:hidden hover:bg-gray-200 transition-colors' onClick={() => setShowSearch(false)}>
                        <RxCross2 size={22} className='text-[#ff4d2d]' />
                    </div> : 
                    <div className='p-2 bg-gray-50 rounded-full cursor-pointer md:hidden hover:bg-gray-100 transition-colors border border-gray-200' onClick={() => setShowSearch(true)}>
                        <IoIosSearch size={22} className='text-[#ff4d2d]' />
                    </div>
                )}
                
                {userData?.role === "owner" ? <>
                 {myShopData && <> 
                    <button className='hidden md:flex items-center gap-2 px-4 py-2 cursor-pointer rounded-xl bg-[#ff4d2d]/10 hover:bg-[#ff4d2d]/20 text-[#ff4d2d] font-semibold transition-colors' onClick={()=>navigate("/add-item")}>
                        <FaPlus size={18} />
                        <span>Add Food Item</span>
                    </button>
                    <button className='md:hidden flex items-center p-2.5 cursor-pointer rounded-xl bg-[#ff4d2d]/10 hover:bg-[#ff4d2d]/20 text-[#ff4d2d] transition-colors shadow-sm' onClick={()=>navigate("/add-item")}>
                        <FaPlus size={20} />
                    </button>
                 </>}
                   
                    <div className='hidden md:flex items-center gap-2.5 cursor-pointer px-4 py-2 rounded-xl bg-[#ff4d2d]/10 hover:bg-[#ff4d2d]/20 text-[#ff4d2d] font-semibold transition-colors' onClick={()=>navigate("/my-orders")}>
                      <TbReceipt2 size={22}/>
                      <span>My Orders</span>
                    </div>
                    <div className='md:hidden flex items-center p-2.5 cursor-pointer rounded-xl bg-[#ff4d2d]/10 hover:bg-[#ff4d2d]/20 text-[#ff4d2d] transition-colors shadow-sm' onClick={()=>navigate("/my-orders")}>
                      <TbReceipt2 size={22}/>
                    </div>
                </> : (
                    <>
                 {userData?.role === "user" && <div className='relative cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors' onClick={()=>navigate("/cart")}>
                    <FiShoppingCart size={26} className='text-gray-700 hover:text-[#ff4d2d] transition-colors' />
                    {cartItems?.length > 0 && <span className='absolute right-0 top-0 w-5 h-5 flex items-center justify-center bg-[#ff4d2d] rounded-full text-white text-[11px] font-bold shadow-sm'>{cartItems.length}</span>}
                </div>}   

                {userData?.role === "user" && <button className='hidden md:block px-4 py-2 rounded-xl bg-[#ff4d2d]/10 hover:bg-[#ff4d2d]/20 text-[#ff4d2d] font-semibold transition-colors' onClick={()=>navigate("/my-orders")}>
                    My Orders
                </button>}
                    </>
                )}

                <div className='relative'>
                    <div className='w-[42px] h-[42px] rounded-full flex items-center justify-center bg-gradient-to-r from-[#ff4d2d] to-[#ff7a63] text-white text-[18px] shadow-md font-bold cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 border-white' onClick={() => setShowInfo(prev => !prev)}>
                        {userData?.fullName?.slice(0, 1).toUpperCase()}
                    </div>
                    {showInfo && <div className={`absolute top-[56px] right-0 w-[200px] bg-white shadow-[0_10px_40px_rgb(0,0,0,0.1)] rounded-2xl p-[8px] flex flex-col z-[9999] border border-gray-100 animate-fade-in origin-top-right`}>
                        <div className='px-4 py-3 border-b border-gray-100 mb-1'>
                            <div className='text-[16px] font-bold text-gray-800 truncate'>{userData?.fullName}</div>
                            <div className='text-xs text-gray-500 font-medium capitalize mt-0.5'>{userData?.role}</div>
                        </div>
                        {userData?.role === "user" && <div className='md:hidden px-4 py-2.5 text-gray-700 font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2' onClick={()=>navigate("/my-orders")}>My Orders</div>}
                        <div className='px-4 py-2.5 text-[#ff4d2d] font-medium cursor-pointer hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 mt-1' onClick={handleLogOut}>Log Out</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}


export default Nav
