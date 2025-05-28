import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {


  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();


  const onclickHandler = () => {
    if(user) {
      navigate('/result');
    }else{
      setShowLogin(true);
    }
  }




  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center items-center text-center my-20"
    >


      <motion.div
       initial={{ opacity: 0.2, y: -20 }}
      transition={{delay: 0.2, duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      
       className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
        <p>Best Text To Image Generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>


      <motion.h1 
      initial={{ opacity: 0.2, y: -20 }}
      transition={{delay: 0.2, duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}

      className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn Text To <br />
        <span className="text-blue-600">image</span>, In Second
      </motion.h1>


      <motion.p
      initial={{ opacity: 0.2, y: -20 }}
      transition={{delay: 0.2, duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
       className="text-center max-w-xl mx-auto mt-5">
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>
      
      <button onClick={onclickHandler} className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-700">
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </button>

      <div className="flex flex-wrap justify-center items-center gap-3 mt-16">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer mx-sm:w-10"
              key={index}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              width={70}
              alt=""
            />
          ))}
      </div>
      <p className="mt-2 text-neutral-600">Generated Imsges from LexiLense</p>
    </motion.div>
  );
};

export default Header;
