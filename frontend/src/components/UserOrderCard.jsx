import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'

function UserOrderCard({ data }) {
    const navigate = useNavigate()
    const [selectedRating, setSelectedRating] = useState({})//itemId:rating

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })

    }

    const handleRating = async (itemId, rating) => {
        try {
            const result = await axios.post(`${serverUrl}/api/item/rating`, { itemId, rating }, { withCredentials: true })
            setSelectedRating(prev => ({
                ...prev, [itemId]: rating
            }))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 p-5 sm:p-7 space-y-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 pb-4 gap-4'>
                <div>
                    <p className='font-extrabold text-gray-900 text-lg sm:text-xl flex items-center gap-2 tracking-tight'>
                        <span className='w-8 h-8 rounded-full bg-orange-50 text-[#ff4d2d] flex items-center justify-center text-sm shadow-inner'>#</span>
                        Order {data._id.slice(-6)}
                    </p>
                    <p className='text-sm text-gray-500 font-medium mt-1 ml-10'>
                        {formatDate(data.createdAt)}
                    </p>
                </div>
                <div className='flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none gap-2'>
                    <div className='flex items-center gap-2'>
                        <span className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Payment</span>
                        {data.paymentMethod === "cod" ?
                            <span className='px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md'>COD</span> :
                            <span className={`px-2 py-1 text-xs font-bold rounded-md ${data.payment ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>Paid Online</span>
                        }
                    </div>
                </div>
            </div>

            <div className='space-y-6'>
                {data.shopOrders.map((shopOrder, index) => (
                    <div className='border border-gray-100 rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#fffaf7] to-white shadow-sm relative overflow-hidden' key={index}>
                        <div className='absolute top-0 left-0 w-1.5 h-full bg-[#ff4d2d]'></div>
                        <div className='flex justify-between items-center mb-4 pl-2'>
                            <p className='font-bold text-gray-900 text-lg flex items-center gap-2'>
                                {shopOrder.shop.name}
                            </p>
                            <span className={`px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-full ${shopOrder.status === 'delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                                shopOrder.status === 'out of delivery' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                    'bg-blue-100 text-blue-700 border border-blue-200'
                                }`}>
                                {shopOrder.status}
                            </span>
                        </div>

                        <div className='flex space-x-4 overflow-x-auto pb-4 pt-1 px-2' style={{ scrollbarWidth: 'none' }}>
                            {shopOrder.shopOrderItems.map((item, idx) => (
                                <div key={idx} className='flex-shrink-0 w-32 sm:w-40 bg-white border border-gray-50 rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow group'>
                                    <div className='w-full h-24 overflow-hidden rounded-lg bg-gray-50 mb-2'>
                                        <img src={item.item?.image} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
                                    </div>
                                    <p className='text-sm font-bold text-gray-800 line-clamp-1' title={item.name}>{item.name}</p>
                                    <div className='flex justify-between items-center mt-1'>
                                        <p className='text-xs font-semibold text-gray-500'>Qty: {item.quantity}</p>
                                        <p className='text-xs font-bold text-[#ff4d2d]'>₹{item.price}</p>
                                    </div>

                                    {shopOrder.status === "delivered" && (
                                        <div className='flex justify-center space-x-1 mt-3 bg-gray-50 py-1.5 rounded-lg border border-gray-100'>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button key={star} className={`text-base outline-none hover:scale-110 active:scale-95 transition-transform ${selectedRating[item.item?._id] >= star ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'}`} onClick={() => handleRating(item.item._id, star)}>★</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between items-center border-t border-orange-100/50 pt-3 mt-1'>
                            <span className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Subtotal</span>
                            <p className='font-extrabold text-gray-800 tracking-tight'>₹{shopOrder.subtotal}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex flex-col sm:flex-row justify-between items-center bg-gray-50/50 p-4 rounded-2xl gap-4 border border-gray-100'>
                <div className='flex items-center gap-2'>
                    <span className='text-sm font-bold text-gray-500 uppercase tracking-widest'>Grand Total</span>
                    <p className='text-2xl font-extrabold text-[#ff4d2d] ml-2 drop-shadow-sm'>₹{data.totalAmount}</p>
                </div>
                <button className='w-full sm:w-auto bg-[#ff4d2d] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#ff4d2d]/20 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2' onClick={() => navigate(`/track-order/${data._id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Track Order
                </button>
            </div>
        </div>
    )
}

export default UserOrderCard
