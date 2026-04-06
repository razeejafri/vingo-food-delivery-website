import React from 'react'

function CategoryCard({name,image,onClick}) {
  return (
    <div className='w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl md:rounded-3xl shrink-0 overflow-hidden bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(255,77,45,0.15)] transition-all duration-300 relative group cursor-pointer border border-gray-100 hover:border-[#ff4d2d]/30 hover:-translate-y-1' onClick={onClick}>
     <img src={image} alt="" className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500'/>
     <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300'></div>
     <div className='absolute bottom-0 w-full left-0 bg-white/20 backdrop-blur-md border-t border-white/20 px-3 py-2 md:py-3 text-center shadow-lg text-sm md:text-base font-bold text-white tracking-wide truncate'>
        {name}
     </div>
    </div>
  )
}

export default CategoryCard
