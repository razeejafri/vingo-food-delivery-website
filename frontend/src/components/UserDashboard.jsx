import React, { useEffect, useRef, useState } from 'react'
import Nav from './NaV.JSX'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import FoodCard from './FoodCard'
import { useNavigate } from 'react-router-dom'
import { setDemoLocation } from '../redux/mapSlice'

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
  }, [shopInMyCity])

  const handleUseDemoCity = () => {
  dispatch(setDemoLocation({
    lat: 26.941614,
    lon: 77.819397
  }))
  setShowDemoModal(false)
}


  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />

      {/* ---------------- DEMO CITY MODAL ---------------- */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[320px] text-center">
            <h2 className="text-lg font-semibold mb-2">
              No restaurants near you
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              This project has demo restaurants available only in <b>Kheragarh</b>.
            </p>

            <button
              onClick={handleUseDemoCity}
              className="bg-[#ff4d2d] text-white w-full py-2 rounded-lg hover:bg-[#e64528]"
            >
              View Restaurants in Kheragarh
            </button>
          </div>
        </div>
      )}

      {/* ---------------- SEARCH RESULTS ---------------- */}
      {searchItems && searchItems.length > 0 && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold border-b pb-2">
            Search Results
          </h1>

          <div className="w-full flex flex-wrap gap-6 justify-center">
            {searchItems.map(item => (
              <FoodCard data={item} key={item._id} />
            ))}
          </div>
        </div>
      )}

      {/* ---------------- CATEGORIES ---------------- */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>

        <div className="w-full relative">
          {showLeftCateButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full z-10"
            >
              <FaCircleChevronLeft />
            </button>
          )}

          <div
            ref={cateScrollRef}
            className="w-full flex overflow-x-auto gap-4 pb-2"
          >
            {categories.map((cate, index) => (
              <CategoryCard
                key={index}
                name={cate.category}
                image={cate.image}
                onClick={() => handleFilterByCategory(cate.category)}
              />
            ))}
          </div>

          {showRightCateButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full z-10"
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* ---------------- SHOPS ---------------- */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Best Shop in {currentCity}
        </h1>

        <div className="w-full relative">
          {showLeftShopButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full z-10"
            >
              <FaCircleChevronLeft />
            </button>
          )}

          <div
            ref={shopScrollRef}
            className="w-full flex overflow-x-auto gap-4 pb-2"
          >
            {shopInMyCity?.map(shop => (
              <CategoryCard
                key={shop._id}
                name={shop.name}
                image={shop.image}
                onClick={() => navigate(`/shop/${shop._id}`)}
              />
            ))}
          </div>

          {showRightShopButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full z-10"
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* ---------------- FOOD ITEMS ---------------- */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Suggested Food Items
        </h1>

        <div className="w-full flex flex-wrap gap-[20px] justify-center">
          {updatedItemsList?.map(item => (
            <FoodCard key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
