import React, { useState, useContext } from "react";
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const { setShowPaymentForm, backendUrl, token, setCredit } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };





  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      backendUrl + "/api/users/add-credits",
      { credits: 100 }, // 👈 Amount to add
      {
        headers: {
          token,
        },
      }
    );

    if (data.success) {
      toast.success("Payment successful! 100 credits added.");
       setCredit(data.updatedCredits);
      setShowPaymentForm(false);
    }

  } catch (error) {
    console.log(error);
    toast.error("Failed to add credits");
  }
};






  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 
    backdrop-blur-sm bg-black/30 flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="relative max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Payment Details
        </h2>

        <div className="flex items-center border rounded-lg p-3">
          <FaUser className="text-gray-400 mr-3" />
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded-lg p-3">
          <FaCreditCard className="text-gray-400 mr-3" />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            maxLength="16"
            value={formData.cardNumber}
            onChange={handleChange}
            className="flex-1 outline-none"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex items-center border rounded-lg p-3 w-1/2">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              maxLength="5"
              value={formData.expiry}
              onChange={handleChange}
              className="flex-1 outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg p-3 w-1/2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              maxLength="4"
              value={formData.cvv}
              onChange={handleChange}
              className="flex-1 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Pay Now
        </button>

        {/* Close Icon */}
        <img
          onClick={() => setShowPaymentForm(false)}
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer w-4 h-4"
        />
      </form>
    </motion.div>
  );
};

export default PaymentForm;
