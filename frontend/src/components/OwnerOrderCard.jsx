import axios from 'axios';
import React from 'react'
import { MdPhone } from "react-icons/md";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice';
import { useState } from 'react';
import { useEffect } from 'react';
function OwnerOrderCard({ data }) {
    const [availableBoys,setAvailableBoys]=useState([])
const dispatch=useDispatch()
    const handleUpdateStatus=async (orderId,shopId,status) => {
        try {
            const result=await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`,{status},{withCredentials:true})
             dispatch(updateOrderStatus({orderId,shopId,status}))
             setAvailableBoys(result.data.availableBoys)
        } catch (error) {
            console.log(error)
        }
    }


  
    return (
        <div className='bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 space-y-5 border border-gray-100 transition-all duration-300'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-start gap-4'>
                <div>
                    <h2 className='text-xl font-extrabold text-gray-900'>{data.user.fullName}</h2>
                    <p className='text-sm text-gray-500 font-medium'>{data.user.email}</p>
                    <p className='flex items-center gap-2 text-sm text-gray-600 mt-2 font-medium'><MdPhone className='text-[#ff4d2d]'/> <span>{data.user.mobile}</span></p>
                    <div className='mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg shadow-sm'>
                        {data.paymentMethod=="online" ? (
                            <p className='text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2'>
                                Card/UPI <span className={`w-2 h-2 rounded-full ${data.payment ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            </p>
                        ) : (
                            <p className='text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2'>
                                COD <span className='w-2 h-2 rounded-full bg-orange-400'></span>
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex flex-col items-start sm:items-end gap-1.5 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 text-sm w-full sm:w-auto'>
                    <span className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Delivery Location</span>
                    <p className='text-gray-800 font-medium max-w-[200px] text-left sm:text-right'>{data?.deliveryAddress?.text}</p>
                    <p className='text-[10px] text-gray-400 font-mono mt-1'>Lat: {data?.deliveryAddress.latitude?.toFixed(4)}, Lon: {data?.deliveryAddress.longitude?.toFixed(4)}</p>
                </div>
            </div>

            <div className='flex space-x-4 overflow-x-auto pb-4 pt-2' style={{ scrollbarWidth: 'thin' }}>
                {data.shopOrders.shopOrderItems.map((item, index) => (
                    <div key={index} className='flex-shrink-0 w-36 sm:w-44 border border-gray-100 rounded-2xl p-2 bg-gray-50/50 group'>
                        <div className='w-full h-24 sm:h-28 overflow-hidden rounded-xl bg-white shadow-sm'>
                            <img src={item.item.image} alt="" className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                        </div>
                        <p className='text-sm font-bold text-gray-800 mt-2 truncate px-1'>{item.name}</p>
                        <p className='text-xs font-semibold text-gray-500 px-1 mt-0.5'>Qty: {item.quantity} <span className='text-gray-300 mx-1'>|</span> <span className='text-[#ff4d2d]'>₹{item.price}</span></p>
                    </div>
                ))}
            </div>

            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto pt-4 border-t border-gray-100 gap-4'>
                <div className='flex items-center gap-3'>
                    <span className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Status</span>
                    <span className={`px-3 py-1 font-bold text-xs uppercase tracking-wider rounded-lg ${
                        data.shopOrders.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        data.shopOrders.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                        data.shopOrders.status === 'out of delivery' ? 'bg-orange-100 text-[#ff4d2d]' :
                        'bg-green-100 text-green-700'
                    }`}>
                        {data.shopOrders.status}
                    </span>
                </div>

                <select className='rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-[#ff4d2d] text-gray-700 hover:border-gray-300 transition-all cursor-pointer shadow-sm' onChange={(e)=>handleUpdateStatus(data._id,data.shopOrders.shop._id,e.target.value)}>
                    <option value="">Update Status</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out of delivery">Out Of Delivery</option>
                </select>
            </div>

            {data.shopOrders.status === "out of delivery" && 
            <div className="p-4 border border-orange-100 rounded-2xl text-sm bg-orange-50/80 mt-2 shadow-inner">
                <p className='font-bold text-gray-800 mb-2 flex items-center gap-2'>
                    <MdPhone className='text-[#ff4d2d]'/> 
                    {data.shopOrders.assignedDeliveryBoy ? "Assigned Delivery Boy" : "Available Delivery Boys"}
                </p>
                <div className='space-y-2'>
                    {availableBoys?.length > 0 ? (
                        availableBoys.map((b,index)=>(
                            <div className='flex items-center justify-between bg-white px-3 py-2 rounded-xl shadow-sm border border-orange-100/50' key={index}>
                                <span className='font-bold text-gray-700'>{b.fullName}</span>
                                <span className='font-mono text-gray-500 text-xs'>{b.mobile}</span>
                            </div>
                        ))
                    ) : data.shopOrders.assignedDeliveryBoy ? (
                        <div className='flex items-center justify-between bg-white px-3 py-2 rounded-xl shadow-sm border border-green-100'>
                            <span className='font-bold text-green-700 flex items-center gap-2'>
                                <span className='w-2 h-2 rounded-full bg-green-500'></span>{data.shopOrders.assignedDeliveryBoy.fullName}
                            </span>
                            <span className='font-mono text-gray-500 text-xs'>{data.shopOrders.assignedDeliveryBoy.mobile}</span>
                        </div>
                    ) : (
                        <div className='bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-100 text-gray-500 text-center font-medium animate-pulse'>
                            Waiting for a delivery boy to accept...
                        </div>
                    )}
                </div>
            </div>}

            <div className='flex justify-between items-center pt-4 border-t border-gray-100 mt-4'>
                <span className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Total Amount</span>
                <span className='text-2xl font-extrabold text-[#ff4d2d] drop-shadow-sm'>
                    ₹{data.shopOrders.subtotal}
                </span>
            </div>
        </div>
    )
}

export default OwnerOrderCard
