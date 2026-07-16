import React, { useState } from 'react'
import { User } from 'lucide-react'

export const CheckoutForm = ({ onSubmit, disabled }) => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')


  const handleSubmit = (e) => {

    e.preventDefault()

    if (!name || !phone || !address) {

      window.dispatchEvent(
        new CustomEvent('show-toast', {
          detail: {
            message: 'Please fill in all required fields'
          }
        })
      )

      return
    }


    onSubmit({
      name,
      phone,
      address,
      note
    })

  }


  return (
    <div className="delivery-form">

      <div className="form-card">


        <h3 className="form-card-title">
          <User size={22} />
          Delivery Details
        </h3>


        <form onSubmit={handleSubmit}>


          <div className="form-group">

            <label className="form-label">
              Full Name <span className="required">*</span>
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>



          <div className="form-group">

            <label className="form-label">
              Phone Number <span className="required">*</span>
            </label>

            <input
              type="tel"
              className="form-input"
              placeholder="76 634 625"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

          </div>



          <div className="form-group">

            <label className="form-label">
              Delivery Address <span className="required">*</span>
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="Street, Building, Apartment No."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

          </div>



          <div className="form-group">

            <label className="form-label">
              Delivery Note <span className="optional">(Optional)</span>
            </label>

            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Any extra instructions?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

          </div>



          <button
            type="submit"
            className="place-order-btn"
            disabled={disabled}
          >

            <i className="fab fa-whatsapp"></i>

            Place Order (WhatsApp)

          </button>


        </form>


      </div>

    </div>
  )
}