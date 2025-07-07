import { useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import ArrowIconLeft from "../components/ArrowIconLeft"

const DecryptPage = () => {
  const [cipher, setCipher] = useState("")
  const [key, setKey] = useState("")
  const [result, setResult] = useState("")
  const [time, setTime] = useState(0)

  const handleDecrypt = async () => {
    if (key.length !== 32) {
        return Swal.fire({
          title: 'Oops!',
          text: 'The Key is not valid!',
          icon: 'error',
          customClass: {
            icon: 'text-red-900',
            popup: 'rounded-xl bg-gray-800 text-white',
            confirmButton: 'bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow',
            title: 'text-2xl font-bold',
            htmlContainer: 'text-sm text-gray-300',
          },
          buttonsStyling: false, // agar customClass digunakan
          })
    
      }
    const start = performance.now()
    try {
      const res = await axios.post("https://profound-radiance-production-de71.up.railway.app/decrypt", {
        text: cipher,
        key,
      })

      const duration = performance.now() - start
      const durationSec = (duration / 1000).toFixed(2)
      setTime(durationSec)
      setResult(res.data.result)
      Swal.fire({
        title: 'Decryption Success',
        html: `<p class="text-green-400 font-semibold">Time process: ${durationSec} s</p>`,
        icon: 'success',
        customClass: {
          popup: 'bg-slate-900 text-white rounded-xl shadow-xl p-6',
          title: 'text-xl font-bold',
          confirmButton: 'bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md text-white',
        },
        buttonsStyling: false,
        })
    } catch (err) {
      const duration = performance.now() - start
      const durationSec = (duration / 1000).toFixed(2)
      setTime(durationSec)
      Swal.fire({
        title: 'Decryption Failed',
        html: `<p class="text-red-400 font-semibold">Time process: ${durationSec} s</p>`,
        icon: 'failed',
        customClass: {
          popup: 'bg-slate-900 text-white rounded-xl shadow-xl p-6',
          title: 'text-xl font-bold',
          confirmButton: 'bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md text-white',
        },
        buttonsStyling: false,
        })
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-[#0F1014] via-[#0F0A38] to-[#150E4A] text-white px-4 py-8"
      style={{
        backgroundImage: "url('/bg-gost.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Back Button */}
      <div>
        <a href="/" className="flex text-xl font-semibold text-white hover:underline items-center">
          <ArrowIconLeft />
          Back
        </a>
      </div>

      {/* Card Container */}
      <div className="bg-black bg-opacity-20 backdrop-blur-sm p-6 md:p-10 rounded-3xl max-w-screen-md mx-auto mt-8">
        <h1
          className="text-2xl font-bold text-center pb-6"
          style={{ textShadow: "0px 0px 20px #00BCF1" }}
        >
          Decryption
        </h1>

        <div className="space-y-4">
          {/* Input Cipher */}
          <div>
            <p className="font-bold pb-1">Input Ciphertext</p>
            <textarea
              className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
              placeholder="Input Chipertext"
              rows={4}
              value={cipher}
              onChange={(e) => setCipher(e.target.value)}
            />
          </div>

          {/* Input Key */}
          <div>
            <p className="font-bold pb-1">Input Key</p>
            <input
              className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
              placeholder="Key (32 character)"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>

          {/* Output */}
          {result && (
            <div>
              <p className="font-bold pb-1">Output</p>
              <div className="bg-gray-800 p-3 rounded-xl border border-gray-100">
                <strong>Plaintext:</strong>
                <p className="mt-1 break-words text-gray-400">{result}</p>
                <strong>Time:</strong>
                <p className="mt-1 break-words text-green-400">{time}s</p>
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleDecrypt}
            className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] shadow-md w-full p-3 rounded-xl font-semibold hover:text-[#00BCF1] hover:shadow-lg transition duration-300"
          >
            Decrypt
          </button>
        </div>
      </div>
    </div>

  )
}

export default DecryptPage
