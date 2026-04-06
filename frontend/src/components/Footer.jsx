import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()

    const categories = [
        "Burger", "Pizza", "Sushi", "Cake", "Pasta",
        "Ice Cream", "Healthy", "Beverages"
    ]

    const quickLinks = [
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Refund Policy", path: "/refund" }
    ]

    return (
        <footer className="w-full bg-[#111111] text-gray-300 pt-20 pb-10 mt-20 relative overflow-hidden">
            {/* Background Accent Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff4d2d]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ff4d2d]/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl font-black text-[#ff4d2d] tracking-tighter cursor-pointer hover:scale-105 transition-transform origin-left" onClick={() => navigate("/")}>
                            Vingo
                        </h1>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Delicious food delivered to your doorstep. Experience the best cuisines from the best restaurants in town with our premium delivery service.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#ff4d2d] hover:border-[#ff4d2d] hover:text-white transition-all duration-300 group">
                                    <Icon className="text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white text-lg font-bold tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#ff4d2d] rounded-full"></span>
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <span
                                        onClick={() => navigate(link.path)}
                                        className="hover:text-[#ff4d2d] hover:translate-x-2 inline-block transition-all duration-300 cursor-pointer text-sm"
                                    >
                                        {link.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white text-lg font-bold tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#ff4d2d] rounded-full"></span>
                            Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cate, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs hover:border-[#ff4d2d] hover:text-[#ff4d2d] transition-all duration-300 cursor-pointer"
                                >
                                    {cate}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white text-lg font-bold tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#ff4d2d] rounded-full"></span>
                            Get in Touch
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#ff4d2d] mt-1 flex-shrink-0" />
                                <span className="text-sm text-gray-400">123 Street, Foodie Lane, Kheragarh</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#ff4d2d] flex-shrink-0" />
                                <span className="text-sm text-gray-400">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#ff4d2d] flex-shrink-0" />
                                <span className="text-sm text-gray-400">support@vingo.com</span>
                            </div>
                        </div>

                        {/* Newsletter Mini Form */}
                        <div className="mt-4 relative group">
                            <input
                                type="text"
                                placeholder="Subscribe to newsletter"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff4d2d] transition-all"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-3 bg-[#ff4d2d] text-white rounded-lg text-xs font-bold hover:bg-[#e64323] transition-colors">
                                JOIN
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Vingo. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Powered by</span>
                        <span className="text-xs font-black text-gray-400 tracking-tighter hover:text-[#ff4d2d] transition-colors cursor-pointer">UNKNOWN DEVELOPER</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
