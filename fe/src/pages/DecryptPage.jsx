import { useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'


const DecryptPage = () => {
  const [cipher, setCipher] = useState("")
  const [key, setKey] = useState("")
  const [result, setResult] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [time, setTime] = useState(0)

  const handleDecrypt = async () => {
    if (key.length !== 32) {
      return Swal.fire({
        icon: 'error',
        title: 'Key is not valid',
        text: 'Key must be 32 character (256-bit)',
      })
    }
    const start = performance.now()
    try {
      const res = await axios.post("http://localhost:5000/decrypt", {
        text: cipher,
        key,
      })

      const duration = performance.now() - start
      const durationMs = duration.toFixed(2)
      const durationSec = (duration / 1000).toFixed(2)
      setTime(durationSec)
      setResult(res.data.result)
      setModalTitle("✅ Decryption Success")
      setModalMessage(
        `Time process: ${durationMs} ms or ${durationSec} s\n\nResult:\n${res.data.result}`
      )
      setModalOpen(true)
    } catch (err) {
      const duration = performance.now() - start
      const durationMs = duration.toFixed(2)
      const durationSec = (duration / 1000).toFixed(2)
      setTime(durationSec)
      setModalTitle("❌ Decryption Failed")
      setModalMessage(
        `Time process: ${durationMs} ms or ${durationSec} s\n\nError: ${
          err.response?.data?.error || "Something went wrong"
        }`
      )
      setModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F1014] via-[#0F0A38] to-[#150E4A] text-white p-8"
      style={{ 
      backgroundImage: "url('/bg-gost.png')",
      backgroundSize: "Cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      }}>
      <div className="flex items-center justify-between mb-6">
				<a href="/" className="text-xl font-semibold text-white hover:underline">
					← Back
				</a>
				<h1 className="text-2xl font-bold text-center flex-1"
        style={{ textShadow: '0px 0px 20px #00BCF1' }}>
          Decryption</h1>
				<div className="w-20" /> {/* Spacer agar judul tetap center */}
			</div>
      <div className="max-w-xl mx-auto space-y-4">
        <textarea
          className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
          placeholder="Input Chipertext"
          rows={4}
          value={cipher}
          onChange={(e) => setCipher(e.target.value)}
        />
        <input
          className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
          placeholder="Key (32 character)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          onClick={handleDecrypt}
          className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] shadow-md w-full p-3 rounded font-semibold"
        >
          Decrypt
        </button>
        {result && (
          <div className="bg-gray-800 p-3 rounded border border-gray-600">
            <strong>Plaintext:</strong>
            <p className="mt-1 break-words text-yellow-300">{result}</p>
            <strong>Time:</strong>
            <p className="mt-1 break-words text-yellow-300">{time}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4">{modalTitle}</h3>
            <pre className="whitespace-pre-wrap mb-6 text-sm text-gray-800">
              {modalMessage}
            </pre>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DecryptPage
