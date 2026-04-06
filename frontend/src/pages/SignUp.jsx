import React from 'react'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import burger from "../assets/burger.png"
import pizza from "../assets/pizza.png"
import sushi from "../assets/sushi.png"
import deliveryBoy from "../assets/delivery_boy.png"
import shopIcon from "../assets/shop.png"

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, mobile, role
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setErr("")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleGoogleAuth = async () => {
        if (!mobile) {
            return setErr("Mobile number is required for Google Registration")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, { withCredentials: true })
            dispatch(setUserData(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen w-full flex bg-[#fff9f6] relative'>
            
            {/* --- Left Column: Auth Form --- */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-20 relative overflow-hidden'>
                {/* Background Floating Food Assets for the Left Side (Added here for depth) */}
                <img src={burger} alt="bg-burger" className="absolute top-[10%] left-[5%] w-20 h-20 object-contain animate-float opacity-[0.03] blur-[1px] -z-10" />
                <img src={pizza} alt="bg-pizza" className="absolute bottom-[10%] right-[10%] w-24 h-24 object-contain animate-float animation-delay-2000 opacity-[0.03] blur-[1px] -z-10" />
                <img src={sushi} alt="bg-sushi" className="absolute top-[40%] left-[2%] w-16 h-16 object-contain animate-float animation-delay-4000 opacity-[0.03] blur-[1px] -z-10" />
                <img src={burger} alt="bg-burger-bottom" className="absolute bottom-[30%] left-[10%] w-16 h-16 object-contain animate-float animation-delay-3000 opacity-[0.03] blur-[1px] -z-10" />

                <div className='w-full max-w-md animate-fade-in py-10 relative z-10'>
                    <div className="text-left mb-8">
                        <h1 className='text-6xl font-black mb-4 text-[#ff4d2d] tracking-tighter drop-shadow-sm italic cursor-pointer hover:scale-105 transition-transform origin-left w-max' onClick={() => navigate("/")}>Vingo</h1>
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h2>
                        <p className='text-gray-500 font-medium'>Join our community of food lovers today.</p>
                    </div>

                    <div className="space-y-4">
                        {/* fullName */}
                        <div>
                            <label className='block text-gray-700 font-bold text-sm mb-1.5 ml-1'>Full Name</label>
                            <input type="text" className='w-full border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all bg-white/80 backdrop-blur-sm font-medium' placeholder='John Doe' onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                        </div>

                        {/* email */}
                        <div>
                            <label className='block text-gray-700 font-bold text-sm mb-1.5 ml-1'>Email</label>
                            <input type="email" className='w-full border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all bg-white/80 backdrop-blur-sm font-medium' placeholder='john@example.com' onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </div>

                        {/* mobile*/}
                        <div>
                            <label className='block text-gray-700 font-bold text-sm mb-1.5 ml-1'>Mobile Number</label>
                            <input type="tel" className='w-full border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all bg-white/80 backdrop-blur-sm font-medium' placeholder='+91 98765 43210' onChange={(e) => setMobile(e.target.value)} value={mobile} required />
                        </div>

                        {/* password*/}
                        <div>
                            <label className='block text-gray-700 font-bold text-sm mb-1.5 ml-1'>Password</label>
                            <div className='relative'>
                                <input type={`${showPassword ? "text" : "password"}`} className='w-full border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d] transition-all pr-14 bg-white/80 backdrop-blur-sm font-medium' placeholder='••••••••' onChange={(e) => setPassword(e.target.value)} value={password} required />
                                <button className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff4d2d] transition-colors' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}</button>
                            </div>
                        </div>

                        {/* role*/}
                        <div>
                            <label className='block text-gray-700 font-bold text-sm mb-2.5 ml-1'>Join Vingo as a</label>
                            <div className='flex gap-2 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100/50 mb-6'>
                                {["user", "owner", "deliveryBoy"].map((r) => (
                                    <button
                                        key={r}
                                        className={`flex-1 rounded-xl py-2.5 text-[10px] font-black transition-all duration-300 uppercase tracking-widest
                                            ${role === r ? 
                                                'bg-white text-[#ff4d2d] shadow-md ring-1 ring-black/5' : 
                                                'text-gray-400 hover:text-gray-600'
                                            }`}
                                        onClick={() => setRole(r)}
                                    >
                                        {r === 'deliveryBoy' ? 'Rider' : r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className='w-full font-black py-4 rounded-xl transition-all duration-300 bg-[#ff4d2d] text-white shadow-xl shadow-[#ff4d2d]/25 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 active:scale-[0.97] cursor-pointer flex justify-center items-center gap-3' onClick={handleSignUp} disabled={loading}>
                            {loading ? <ClipLoader size={22} color='white' /> : "Create Vingo Account"}
                        </button>
                        
                        {err && <p className='text-red-500 text-center text-xs font-bold bg-red-50 py-3 rounded-xl border border-red-100 animate-fade-in'>⚠️ {err}</p>}

                        <div className='relative my-6'>
                            <div className='absolute inset-0 flex items-center'><div className='w-full border-t border-gray-100'></div></div>
                            <div className='relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]'><span className='px-4 bg-[#fff9f6] text-gray-400'>Express App</span></div>
                        </div>

                        <button className='w-full flex items-center justify-center gap-3 border-2 border-gray-100 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-transparent cursor-pointer active:scale-[0.97] bg-white/50 group' onClick={handleGoogleAuth}>
                            <FcGoogle size={24} />
                            <span className='font-bold text-gray-700 group-hover:text-gray-900'>Register with Google</span>
                        </button>

                        <p className='text-center mt-8 text-sm font-medium text-gray-500'>
                            Already have an account? <span className='text-[#ff4d2d] font-black cursor-pointer hover:underline underline-offset-8' onClick={() => navigate("/signin")}>Sign In here</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Right Column: Hero Banner --- */}
            <div className='hidden lg:block w-1/2 relative z-10'>
                <div className='sticky top-0 h-screen bg-gradient-to-br from-[#111111] to-[#222222] flex items-center justify-center overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.2)]'>
                    {/* Decorative background objects */}
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff4d2d]/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#ff4d2d]/5 rounded-full blur-[100px]"></div>
                    
                    {/* Main Hero Assets */}
                    <img src={burger} alt="burger" className="absolute top-[15%] right-[20%] w-24 h-24 object-contain animate-float opacity-40 transition-all duration-1000" />
                    <img src={pizza} alt="pizza" className="absolute bottom-[20%] left-[10%] w-32 h-32 object-contain animate-float animation-delay-2000 opacity-40 transition-all duration-1000" />

                    <div className="relative z-20 flex flex-col items-center text-center px-12 animate-slide-in-right">
                        <div className="relative mb-8">
                            <img src={shopIcon} alt="Shop" className="w-[280px] h-auto object-contain animate-float-slow drop-shadow-2xl" />
                            <img src={deliveryBoy} alt="Delivery Boy" className="absolute -bottom-8 -left-16 w-40 h-40 object-contain animate-float animation-delay-2000 drop-shadow-xl" />
                        </div>
                        <h2 className="text-5xl font-black text-white mb-6 tracking-tighter leading-tight">Grow your business<br/>with <span className="text-[#ff4d2d]">Vingo.</span></h2>
                        <p className="text-gray-400 text-xl font-medium max-w-md">Join thousands of restaurants and riders who are part of our growing community across the globe.</p>
                    </div>
                </div>
            </div>

            {/* Background Blobs for Mobile */}
            <div className="lg:hidden absolute top-[-10%] left-[-5%] w-72 h-72 bg-[#ff4d2d]/10 rounded-full blur-3xl animate-blob"></div>
            <div className="lg:hidden absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#ff4d2d]/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
    )
}

export default SignUp
