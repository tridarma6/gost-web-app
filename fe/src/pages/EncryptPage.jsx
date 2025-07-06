import axios from "axios"
import { useState } from "react"
import Swal from 'sweetalert2'
import ArrowIconLeft from "../components/ArrowIconLeft"
import { Eye, EyeOff } from "lucide-react"

const EncryptPage = () => {
  const [text, setText] = useState("")
  const [key, setKey] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [appPassword, setAppPassword] = useState("")
  const [result, setResult] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
		<div className="bg-black p-20 mx-80 rounded-3xl bg-opacity-20 backdrop-blur-sm">
			<div className="flex flex-col items-center justify-between mb-6 text-center">
				<h1 className="text-2xl font-bold text-center"
				style={{ textShadow: '0px 0px 20px #00BCF1' }}>
					Encryption</h1>
			
			</div>

			<div className="max-w-xl mx-auto space-y-4">
				<div>
					<p className="font-bold pb-1">Input Plaintext</p>
					<input
						type="text"
						placeholder="Plaintext"
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
						required
					/>
				</div>

				<div>
					<p className="font-bold pb-1">Input Key</p>
					<input
						type="text"
						placeholder="Key (32 character)"
						value={key}
						onChange={(e) => setKey(e.target.value)}
						className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray  text-white"
						required
					/>
				</div>

				<div>
					<p className="font-bold pb-1">Input Recipient Email</p>
					<input
						type="email"
						placeholder="Recipient Email"
						value={recipientEmail}
						onChange={(e) => setRecipientEmail(e.target.value)}
						className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
					/>
				</div>

				<div>
					<p className="font-bold pb-1">Input Email</p>
					<input
						type="email"
						placeholder="Sender's Email"
						value={senderEmail}
						onChange={(e) => setSenderEmail(e.target.value)}
						className="w-full p-3 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
					/>
				</div>

				<div className="relative">
					<p className="font-bold pb-1">Input Email App Password</p>
					<input
						type={showPassword ? "text" : "password"}
						placeholder="App Password Gmail"
						value={appPassword}
						onChange={(e) => setAppPassword(e.target.value)}
						className="w-full p-3 pr-12 bg-[#181B26] border border-white rounded placeholder:text-gray text-white"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-4 top-[42px] text-gray-400 hover:text-white"
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
					</div>

				{result && (
					<div className="bg-gray-800 p-3 rounded border border-white">
						<strong>Ciphertext:</strong>
						<p className="mt-1 break-words text-[#00BCF1]">{result}</p>
						<strong>Time:</strong>
						<p className="mt-1 break-words text-[#00BCF1]">{time}s</p>
					</div>
				)}

				<div className="flex gap-4 mb-4 items-center w-full">
					<button onClick={handleEncryptOnly} className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] shadow-md px-4 py-2 rounded-xl hover:text-[#00BCF1] hover:shadow-lg transition duration-300 w-full">
						Encrypt
					</button>
					<button onClick={handleEncryptAndSendEmail} className="bg-gradient-to-r from-[#0F1014] to-[#181B26] text-white shadow-[#00BCF1] shadow-md px-4 py-2 rounded-xl hover:text-[#00BCF1] hover:shadow-lg transition duration-300 w-full">
						Encrypt & Send Email
					</button>
				</div>
			</div>
		</div>
    </div>
  )
}

export default EncryptPage
