
import { useState } from 'react'
import './App.css'

// 👇 INGA UNGA RENDER BACKEND LINK PODUNGA (Last slash '/' vendam)
const API_URL = "https://data-entry-7v0g.onrender.com";

function App() {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    address: '',
    town: '',
    partnerName: '',
    fatherName: '',
    motherName: '',
    college: '',
    school: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Saving...')
    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setMessage('✅ Saved Successfully!')
        setFormData({
          name: '', class: '', address: '', town: '', partnerName: '',
          fatherName: '', motherName: '', college: '', school: ''
        })
      } else {
        setMessage('❌ Error Saving Data')
      }
    } catch (error) {
      console.error(error)
      setMessage('❌ Network Error')
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>✨ Data Entry ✨</h1>
        <p className="subtitle">Enter student details below</p>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="class" placeholder="Class" value={formData.class} onChange={handleChange} />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <input name="town" placeholder="Town" value={formData.town} onChange={handleChange} />

            <input name="partnerName" placeholder="Partner Name" value={formData.partnerName} onChange={handleChange} />
            <input name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} />
            <input name="motherName" placeholder="Mother Name" value={formData.motherName} onChange={handleChange} />
            <input name="college" placeholder="College" value={formData.college} onChange={handleChange} />
            <input name="school" placeholder="School" value={formData.school} onChange={handleChange} />
          </div>

          <button type="submit">🚀 Save Record</button>
        </form>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  )
}

export default App
