import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { FaUtensils } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import OwnerItemCard from './OwnerItemCard';
import Footer from './Footer'
function OwnerDashboard() {
  const { myShopData } = useSelector(state => state.owner)
  const navigate = useNavigate()

  
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] flex flex-col items-center pb-12'>
      <Nav />
      
      {!myShopData &&
        <div className='flex justify-center items-center p-4 sm:p-6 mt-[120px] w-full'>
          <div className='w-full max-w-md bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl p-8 border border-white/50 hover:-translate-y-1 transition-all duration-300'>
            <div className='flex flex-col items-center text-center'>
              <div className='w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-inner'>
                  <FaUtensils className='text-[#ff4d2d] w-10 h-10' />
              </div>
              <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight'>Add Your Restaurant</h2>
              <p className='text-gray-500 mb-8 leading-relaxed text-sm sm:text-base'>
                  Join our premium food delivery platform and showcase your culinary creations to thousands of eager customers.
              </p>
              <button className='w-full bg-[#ff4d2d] text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-[#ff4d2d]/30 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 transition-all duration-300 active:scale-[0.98]' onClick={() => navigate("/create-edit-shop")}>
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      }

      {myShopData &&
        <div className='w-full max-w-4xl flex flex-col items-center gap-8 px-4 sm:px-6 mt-[100px]'>
          
          <div className='w-full text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-end justify-between bg-white/60 p-6 rounded-3xl border border-white/50 shadow-sm'>
             <div>
                 <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center justify-center sm:justify-start gap-4 tracking-tight drop-shadow-sm'>
                    <FaUtensils className='text-[#ff4d2d] w-8 h-8' />
                    {myShopData.name}
                 </h1>
                 <p className='text-gray-500 mt-2 font-medium'>Manage your restaurant's presence and menu.</p>
             </div>
             <div className='mt-4 sm:mt-0'>
                 <span className='px-4 py-1.5 bg-green-100 text-green-700 font-bold rounded-full text-sm shadow-sm'>Active Partner</span>
             </div>
          </div>

          <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-all duration-300 w-full relative group'>
            <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#ff4d2d] p-3 rounded-full shadow-lg hover:scale-110 hover:text-white hover:bg-[#ff4d2d] transition-all cursor-pointer z-10' onClick={()=>navigate("/create-edit-shop")}>
               <FaPen size={18}/>
            </div>
            <div className='relative w-full h-56 sm:h-72 overflow-hidden bg-gray-50'>
                 <img src={myShopData.image} alt={myShopData.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'/>
                 <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                 <div className='absolute bottom-6 left-6 text-white'>
                     <span className='px-3 py-1 bg-[#ff4d2d] rounded-lg text-xs font-bold uppercase tracking-wider mb-2 inline-block'>Restaurant Details</span>
                     <p className='text-white/90 font-medium flex items-center gap-2 drop-shadow-md pb-1'><FaLocationDot className='text-white'/> {myShopData.city}, {myShopData.state}</p>
                     <p className='text-white/80 text-sm max-w-md line-clamp-1 drop-shadow-md pb-1'>{myShopData.address}</p>
                 </div>
            </div>
          </div>

          {myShopData.items.length === 0 && 
            <div className='flex justify-center items-center w-full mt-4'>
                <div className='w-full bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-3xl p-8 border border-orange-100 sm:p-10 text-center relative overflow-hidden'>
                  <div className='absolute -right-10 -top-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl'></div>
                  <div className='relative z-10 flex flex-col items-center'>
                      <div className='w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-inner'>
                          <FaUtensils className='text-[#ff4d2d] w-10 h-10' />
                      </div>
                      <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3'>Create Your Menu</h2>
                      <p className='text-gray-500 mb-8 max-w-md mx-auto'>
                          Your restaurant is active, but your menu is empty! Add your signature dishes to start receiving orders.
                      </p>
                      <button className='bg-[#ff4d2d] text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-[#ff4d2d]/30 hover:bg-[#e64323] transition-all duration-300 active:scale-95' onClick={() => navigate("/add-item")}>
                          + Add Food Item
                      </button>
                  </div>
                </div>
            </div>
          }

          {myShopData.items.length > 0 && 
            <div className='w-full'>
                <div className='flex items-center justify-between mb-6 px-2'>
                    <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>Menu Items ({myShopData.items.length})</h2>
                    <button className='text-[#ff4d2d] font-bold text-sm bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors' onClick={() => navigate("/add-item")}>+ Add New</button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full'>
                  {myShopData.items.map((item, index) => (
                    <OwnerItemCard data={item} key={index}/>
                  ))}
                </div>
            </div>
          }
        </div>
      }
      <Footer />
    </div>
  )
}

export default OwnerDashboard
