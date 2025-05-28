import React from 'react'
import { stepsData } from "../assets/assets"
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    <motion.div
     initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
     className='flex flex-col justify-center items-center text-center my-32'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How It Works</h1>
      <p className='text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>

      <div className='space-y-4 w-full max-w-3xl text-sm'>
        {stepsData.map((item, index) => (
          <div
            key={index}
            className='flex items-start gap-4 p-5 px-8 bg-white/20 shadow-md border rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300'
          >
            <div className='flex-shrink-0'>
              <img src={item.icon} alt="" className='w-10 h-10' />
            </div>
            <div className='text-left'>
              <h2 className='text-lg font-semibold'>{item.title}</h2>
              <p className='text-gray-600 text-sm'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
