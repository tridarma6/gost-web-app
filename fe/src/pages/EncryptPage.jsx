import axios from "axios"
import { useState } from "react"
import Swal from 'sweetalert2'
import ArrowIconLeft from "../components/ArrowIconLeft"

const EncryptPage = () => {
  const [text, setText] = useState("")
  const [key, setKey] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [appPassword, setAppPassword] = useState("")
  const [result, setResult] = useState("")
  const [modal, setModal] = useState({ show: false, title: "", message: "" })
	const [time, setTime] = useState(0)

  const handleEncryptOnly = async () => {
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
		const res = await axios.post("http://localhost:5000/encrypt", { text, key })
		const duration = performance.now() - start
		const durationSec = (duration / 1000).toFixed(2)
		setTime(durationSec)
		setResult(res.data.result)
		Swal.fire({
			title: 'Encryption Success',
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
		title: 'Encryption Failed',
		html: `<p class="text-red-400 font-semibold">Time process: ${durationSec} s</p>`,
		icon: 'failed',
		customClass: {
			popup: 'bg-slate-900 text-white rounded-xl shadow-xl p-6',
			title: 'text-xl font-bold',
			confirmButton: 'bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white',
		},
		buttonsStyling: false,
		})
	}
	}


  const handleEncryptAndSendEmail = async () => {
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
      const res = await axios.post("http://localhost:5000/encrypt-email", {
        text,
        key,
        to_email: recipientEmail,
        sender_email: senderEmail,
        app_password: appPassword,
      })
      const duration = performance.now() - start
		const durationSec = (duration / 1000).toFixed(2)
		setTime(durationSec)
      setResult(res.data.result)
      Swal.fire({
		title: 'Encryption Success',
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
		title: 'Encryption Failed',
		html: `<p class="text-red-400 font-semibold">Time process: ${durationSec} s</p>`,
		icon: 'failed',
		customClass: {
			popup: 'bg-slate-900 text-white rounded-xl shadow-xl p-6',
			title: 'text-xl font-bold',
			confirmButton: 'bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white',
		},
		buttonsStyling: false,
		})
    }
  }


  return (
    <div className="min-h-screen text-white p-8"
	style={{ 
    backgroundImage: "url('/bg-gost.png')",
    backgroundSize: "Cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    }}>
		{/* Back Button */}
		<div>
			<a href="/" className="flex text-xl font-semibold text-white hover:underline">
					<ArrowIconLeft/>
					Back
			</a>
		</div>

		{/* Encryption */}
		<div className="bg-black p-20 mx-80 rounded-3xl bg-opacity-60 ">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-center flex-1"
				style={{ textShadow: '0px 0px 20px #00BCF1' }}>
					Encryption</h1>
				<div className="w-20" /> {/* Spacer agar judul tetap center */}
			</div>

			<div className="max-w-xl mx-auto space-y-4">
				<input
					type="text"
					placeholder="Plaintext"
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
					required
				/>

				<input
					type="text"
					placeholder="Key (32 character)"
					value={key}
					onChange={(e) => setKey(e.target.value)}
					className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray  text-white"
					required
				/>

				<input
					type="email"
					placeholder="Recipient Email"
					value={recipientEmail}
					onChange={(e) => setRecipientEmail(e.target.value)}
					className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
				/>

				<input
					type="email"
					placeholder="Sender's Email"
					value={senderEmail}
					onChange={(e) => setSenderEmail(e.target.value)}
					className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
				/>

				<input
					type="password"
					placeholder="App Password Gmail"
					value={appPassword}
					onChange={(e) => setAppPassword(e.target.value)}
					className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
				/>

				<div className="flex gap-4 mb-4 ">
					<button onClick={handleEncryptOnly} className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] shadow-md px-4 py-2 rounded-xl hover:text-[#00BCF1] hover:shadow-lg transition duration-300">
						Encrypt
					</button>
					<button onClick={handleEncryptAndSendEmail} className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] shadow-md px-4 py-2 rounded-xl hover:text-[#00BCF1] hover:shadow-lg transition duration-300">
						Encrypt & Send Email
					</button>
				</div>

				{result && (
					<div className="bg-gray-800 p-3 rounded border border-gray-600">
							<strong>Plaintext:</strong>
							<p className="mt-1 break-words text-yellow-300">{result}</p>
							<strong>Time:</strong>
							<p className="mt-1 break-words text-yellow-300">{time}</p>
						</div>
				)}
			</div>
		</div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{modal.title}</h2>
            <pre className="whitespace-pre-wrap text-sm">{modal.message}</pre>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EncryptPage
