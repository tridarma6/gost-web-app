import React from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F1014] via-[#0F0A38] to-[#150E4A] text-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Description */}
        <div>
          <h1 className="text-4xl font-bold mb-4">GOST Email Encryption System</h1>
          <p className="text-lg text-gray-300">
            A modern encryption platform that allows you to secure messages using the powerful and trusted GOST algorithm (a Russian encryption standard).
            With this system, you can instantly encrypt messages and send the results directly to the recipient's email to ensure data confidentiality is maintained.
          </p>
        </div>

        {/* RIGHT: Buttons */}
        <div className="flex flex-col gap-4 items-center">
          <img src="/shield.png" alt="Shield" className="mb-6" />
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/encrypt")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
            >
              Encryption
            </button>
            <button
              onClick={() => navigate("/decrypt")}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
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
