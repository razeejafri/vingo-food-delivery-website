import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaCircleChevronLeft, FaCircleChevronRight, FaLocationDot } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import FoodCard from './FoodCard'
import { useNavigate } from 'react-router-dom'
import { setDemoLocation } from '../redux/mapSlice'
import Footer from './Footer'

function UserDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } =
    useSelector(state => state.user)

  const cateScrollRef = useRef()
  const shopScrollRef = useRef()

  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
  const [updatedItemsList, setUpdatedItemsList] = useState([])
  const [showDemoModal, setShowDemoModal] = useState(false)

  /* ---------------- CATEGORY FILTER ---------------- */
  const handleFilterByCategory = (category) => {
    if (category === "All") {
      setUpdatedItemsList(itemsInMyCity)
    } else {
      const filtered = itemsInMyCity?.filter(i => i.category === category)
      setUpdatedItemsList(filtered)
    }
  }

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])

  /* ---------------- SCROLL BUTTON LOGIC ---------------- */
  const updateButton = (ref, setLeft, setRight) => {
    const el = ref.current
    if (!el) return
    setLeft(el.scrollLeft > 0)
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth)
  }

  const scrollHandler = (ref, direction) => {
    ref.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    if (cateScrollRef.current && shopScrollRef.current) {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

      const cateScroll = () =>
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      const shopScroll = () =>
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

      cateScrollRef.current.addEventListener("scroll", cateScroll)
      shopScrollRef.current.addEventListener("scroll", shopScroll)

      return () => {
        cateScrollRef.current?.removeEventListener("scroll", cateScroll)
        shopScrollRef.current?.removeEventListener("scroll", shopScroll)
      }
    }
  }, [])

  /* ---------------- DEMO CITY LOGIC ---------------- */
  useEffect(() => {
    if (shopInMyCity && shopInMyCity.length === 0) {
      setShowDemoModal(true)
    } else {
      setShowDemoModal(false)
    }
  }, [shopInMyCity, currentCity])

  const handleUseDemoCity = () => {
    dispatch(setDemoLocation({
      lat: 26.941614,
      lon: 77.819397
    }))
    setShowDemoModal(false)
  }


  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#fff9f6] overflow-y-auto pb-10">
      <Nav />

      {/* ---------------- DEMO CITY MODAL ---------------- */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/20">
            <div className='w-16 h-16 bg-red-50 text-[#ff4d2d] rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaLocationDot size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No restaurants nearby
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              This is a demo project. Restaurants are currently only available in <span className='font-bold text-gray-800'>Kheragarh</span>.
            </p>

            <button
              onClick={handleUseDemoCity}
              className="bg-[#ff4d2d] text-white w-full py-3.5 rounded-xl font-semibold shadow-lg shadow-[#ff4d2d]/30 hover:bg-[#e64323] hover:shadow-[#ff4d2d]/40 transition-all duration-300 active:scale-[0.98]"
            >
              Explore Kheragarh
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-[100px] flex flex-col gap-10">
        {/* ---------------- SEARCH RESULTS ---------------- */}
        {searchItems && searchItems.length > 0 && (
          <div className="w-full flex flex-col gap-6 p-6 sm:p-8 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl animate-fade-in">
            <h1 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span className='w-2 h-8 bg-[#ff4d2d] rounded-full'></span>
              Search Results
            </h1>
            <div className="w-full flex flex-wrap gap-6 justify-center sm:justify-start">
              {searchItems.map(item => (
                <FoodCard data={item} key={item._id} />
              ))}
            </div>
          </div>
        )}

        {/* ---------------- CATEGORIES ---------------- */}
        <div className="w-full flex flex-col gap-6">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight px-2">
            Inspiration for your first order
          </h1>

          <div className="w-full relative group">
            {showLeftCateButton && (
              <button
                onClick={() => scrollHandler(cateScrollRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg text-[#ff4d2d] p-3 rounded-full z-10 border border-gray-100 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <FaCircleChevronLeft size={24} />
              </button>
            )}

            <div
              ref={cateScrollRef}
              className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-6 px-2 snap-x"
              style={{ scrollbarWidth: 'none' }}
            >
              {categories.map((cate, index) => (
                <div className='snap-start' key={index}>
                  <CategoryCard
                    name={cate.category}
                    image={cate.image}
                    onClick={() => handleFilterByCategory(cate.category)}
                  />
                </div>
              ))}
            </div>

            {showRightCateButton && (
              <button
                onClick={() => scrollHandler(cateScrollRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg text-[#ff4d2d] p-3 rounded-full z-10 border border-gray-100 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <FaCircleChevronRight size={24} />
              </button>
            )}
          </div>
        </div>

        {/* ---------------- SHOPS ---------------- */}
        <div className="w-full flex flex-col gap-6">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2 px-2">
            Best Shops in <span className='text-[#ff4d2d] bg-orange-50 px-3 py-1 rounded-xl'>{currentCity}</span>
          </h1>

          <div className="w-full relative group">
            {showLeftShopButton && (
              <button
                onClick={() => scrollHandler(shopScrollRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg text-[#ff4d2d] p-3 rounded-full z-10 border border-gray-100 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <FaCircleChevronLeft size={24} />
              </button>
            )}

            <div
              ref={shopScrollRef}
              className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-6 px-2 snap-x"
              style={{ scrollbarWidth: 'none' }}
            >
              {shopInMyCity?.map(shop => (
                <div className='snap-start' key={shop._id}>
                  <CategoryCard
                    name={shop.name}
                    image={shop.image}
                    onClick={() => navigate(`/shop/${shop._id}`)}
                  />
                </div>
              ))}
            </div>

            {showRightShopButton && (
              <button
                onClick={() => scrollHandler(shopScrollRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg text-[#ff4d2d] p-3 rounded-full z-10 border border-gray-100 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <FaCircleChevronRight size={24} />
              </button>
            )}
          </div>
        </div>

        {/* ---------------- FOOD ITEMS ---------------- */}
        <div className="w-full flex flex-col gap-6">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight px-2">
            Suggested For You
          </h1>

          <div className="w-full flex flex-wrap gap-6 sm:gap-8 justify-center sm:justify-start px-2">
            {updatedItemsList?.map(item => (
              <FoodCard key={item._id} data={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserDashboard
