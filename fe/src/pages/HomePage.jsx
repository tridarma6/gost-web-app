import React from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: "url('/bg-gost.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Description */}
        <div className="text-center md:text-left">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ textShadow: "0px 0px 20px #00BCF1" }}
          >
            GOST Email Encryption System
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            A modern encryption platform that allows you to secure messages using the powerful and trusted GOST algorithm (a Russian encryption standard).
            With this system, you can instantly encrypt messages and send the results directly to the recipient's email to ensure data confidentiality is maintained.
          </p>
        </div>

        {/* RIGHT: Buttons */}
        <div className="flex flex-col items-center">
          <img
            src="/shield.png"
            alt="Shield"
            className="mb-6 w-32 md:w-48"
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => navigate("/encrypt")}
              className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] font-semibold px-6 py-3 rounded-xl shadow-md hover:text-[#00BCF1] hover:shadow-lg transition duration-300 w-full sm:w-auto"
            >
              Encryption
            </button>
            <button
              onClick={() => navigate("/decrypt")}
              className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] font-semibold px-6 py-3 rounded-xl shadow-md hover:text-[#00BCF1] hover:shadow-lg transition duration-300 w-full sm:w-auto"
            >
              Decryption
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
