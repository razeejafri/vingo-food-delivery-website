import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';
function CartPage() {
    const navigate = useNavigate()
    const { cartItems, totalAmount } = useSelector(state => state.user)
    return (
        <div className='min-h-screen bg-gradient-to-br from-[#fff9f6] to-[#ffe5db] flex justify-center p-4 sm:p-6 pb-20'>
            <div className='w-full max-w-4xl'>
                <div className='flex items-center gap-4 mb-8 mt-4'>
                    <button className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md hover:text-[#ff4d2d] transition-all z-[10]' onClick={() => navigate("/")}>
                        <IoIosArrowRoundBack size={28} className='text-gray-600 hover:text-[#ff4d2d]' />
                    </button>
                    <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Your Cart</h1>
                </div>
                {cartItems?.length == 0 ? (
                    <div className='flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-3xl p-12 py-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 text-center'>
                        <div className='w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6'>
                            <span className='text-[#ff4d2d] text-4xl font-bold font-mono tracking-tighter'>0</span>
                        </div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Your cart is empty</h2>
                        <p className='text-gray-500 mb-8 max-w-sm'>Looks like you haven't added anything to your cart yet. Browse our menu to find something delicious!</p>
                        <button className='bg-[#ff4d2d] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-[#ff4d2d]/30 hover:bg-[#e64323] transition-all duration-300 active:scale-95' onClick={()=>navigate("/")}>Browse Menu</button>
                    </div>
                ) : (<>
                    <div className='space-y-4'>
                        {cartItems?.map((item, index) => (
                            <CartItemCard data={item} key={index} />
                        ))}
                    </div>
                    <div className='mt-8 bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col sm:flex-row justify-between items-center border border-gray-100 gap-6'>
                        <div className='flex flex-col items-center sm:items-start'>
                            <h1 className='text-gray-500 font-bold uppercase tracking-widest text-xs mb-1'>Total Amount</h1>
                            <span className='text-4xl font-extrabold text-[#ff4d2d]'>₹{totalAmount}</span>
                        </div>
                        <button className='w-full sm:w-auto bg-[#ff4d2d] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-[#ff4d2d]/30 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2' onClick={()=>navigate("/checkout")}>
                            Proceed to CheckOut
                            <IoIosArrowRoundBack size={24} className='rotate-180' />
                        </button>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

export default CartPage
