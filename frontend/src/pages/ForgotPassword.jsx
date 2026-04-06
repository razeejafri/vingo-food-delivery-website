import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import burger from "../assets/burger.png"
import pizza from "../assets/pizza.png"
import sushi from "../assets/sushi.png"

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [err, setErr] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
      setErr("")
      setStep(2)
      setLoading(false)
    } catch (error) {
      setErr(error.response.data.message)
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
      setErr("")
      setStep(3)
      setLoading(false)
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
      setErr("")
      setLoading(false)
      navigate("/signin")
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6] relative overflow-hidden'>
      {/* --- Floating Background Blobs --- */}
      <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-[#ff4d2d]/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#ff4d2d]/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* --- Floating Food Images --- */}
      <img src={burger} alt="burger" className="absolute top-[20%] left-[15%] w-24 h-24 object-contain opacity-20 animate-float hidden lg:block" />
      <img src={pizza} alt="pizza" className="absolute bottom-[25%] right-[20%] w-28 h-28 object-contain opacity-20 animate-float animation-delay-2000 hidden lg:block" />

      {/* --- Auth Card --- */}
      <div className='bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full max-w-md p-8 border border-white/60 relative z-10 animate-fade-in'>
        <div className='flex items-center gap-4 mb-10'>
          <div className='bg-white/80 p-2.5 rounded-2xl cursor-pointer hover:bg-[#ff4d2d] hover:text-white transition-all shadow-sm group' onClick={() => navigate("/signin")}>
            <IoIosArrowRoundBack size={28} className='text-[#ff4d2d] group-hover:text-white' />
          </div>
          <h1 className='text-3xl font-black text-gray-900 tracking-tighter'>Reset Password</h1>
        </div>

        {step === 1 &&
          <div className='animate-fade-in'>
            <p className='text-gray-500 font-medium mb-8 leading-relaxed'>No worries! Enter your email and we'll send you an OTP to reset your password.</p>
            <div className='mb-8'>
              <label htmlFor="email" className='block text-gray-700 font-bold ml-1 mb-2'>Email Address</label>
              <input type="email" className='w-full border border-gray-200/80 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all bg-white/60 font-medium' placeholder='yourname@example.com' onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
            <button className='w-full font-black py-4 rounded-2xl transition-all duration-300 bg-[#ff4d2d] text-white shadow-xl shadow-[#ff4d2d]/25 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 active:scale-[0.97] cursor-pointer flex justify-center items-center' onClick={handleSendOtp} disabled={loading}>
              {loading ? <ClipLoader size={22} color='white' /> : "Send Reset Code"}
            </button>
          </div>}

        {step === 2 &&
          <div className='animate-fade-in'>
            <p className='text-gray-500 font-medium mb-8'>We've sent a 6-digit code to <span className='font-bold text-gray-900'>{email}</span>. Please enter it below.</p>
            <div className='mb-8'>
              <label htmlFor="otp" className='block text-gray-700 font-bold ml-1 mb-2'>Verification Code</label>
              <input type="text" className='w-full border border-gray-200/80 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all bg-white/60 text-center tracking-[0.5em] text-2xl font-black' placeholder='••••••' onChange={(e) => setOtp(e.target.value)} value={otp} maxLength={6} required />
            </div>
            <button className='w-full font-black py-4 rounded-2xl transition-all duration-300 bg-[#ff4d2d] text-white shadow-xl shadow-[#ff4d2d]/25 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 active:scale-[0.97] cursor-pointer flex justify-center items-center' onClick={handleVerifyOtp} disabled={loading}>
              {loading ? <ClipLoader size={22} color='white' /> : "Verify Identity"}
            </button>
          </div>}

        {step === 3 &&
          <div className='animate-fade-in'>
            <p className='text-gray-500 font-medium mb-8'>Create a new, strong password for your Vingo account.</p>
            <div className='space-y-6 mb-10'>
              <div>
                <label htmlFor="newPassword" className='block text-gray-700 font-bold ml-1 mb-2'>New Password</label>
                <input type="password" className='w-full border border-gray-200/80 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all bg-white/60 font-medium' placeholder='••••••••' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
              </div>
              <div>
                <label htmlFor="ConfirmPassword" className='block text-gray-700 font-bold ml-1 mb-2'>Confirm Password</label>
                <input type="password" className='w-full border border-gray-200/80 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all bg-white/60 font-medium' placeholder='••••••••' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
              </div>
            </div>
            <button className='w-full font-black py-4 rounded-2xl transition-all duration-300 bg-[#ff4d2d] text-white shadow-xl shadow-[#ff4d2d]/25 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 active:scale-[0.97] cursor-pointer flex justify-center items-center' onClick={handleResetPassword} disabled={loading}>
              {loading ? <ClipLoader size={22} color='white' /> : "Update Password"}
            </button>
          </div>}

        {err && <p className='text-red-500 text-center text-xs font-bold mt-4 bg-red-50 py-3 rounded-xl border border-red-100 animate-fade-in'>⚠️ {err}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword
