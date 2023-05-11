import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Contact = () => {

  const[email,setEmail]=useState("")
  const[name,setName]=useState("")
  const[message,setMessage]=useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    
    
    const conFom = {
      name: event.target.elements.value,
      email: event.target.elements.value,
      message: event.target.elements.value,
    }
    axios.post("http://localhost:3001/kontakt", conFom)
    .then(()=>{
      event.target.reset()
    })

    
    
  };
    
  
  return (
    <div className="container mt-5">
      
      <h3 className="mb-3">Kontaktiraj nas</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input className="form-control" type="text" id="name" required onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" required onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea className="form-control" id="message" required onChange={(event) => setMessage(event.target.value)} />
        </div>
        <button className="btn btn-danger" type="submit"  >
          SEND
        </button>
      </form>
    </div>
  )}
  
export default Contact;