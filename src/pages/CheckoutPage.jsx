import React, { useState, useEffect } from 'react'
import { Footer, showToast } from '../components/Layout'
import { useCart } from '../context/CartContext'
import { CheckoutForm } from '../components/Checkout/CheckoutForm'
import { OrderSummary } from '../components/Checkout/OrderSummary'
import { LocationPopup } from '../components/Checkout/LocationPopup'
import '../styles/CheckoutPage.css'

const CheckoutPage = () => {


  const {
    cart,
    getTotalPrice,
    clearCart
  } = useCart()



  const [showLocationPopup, setShowLocationPopup] = useState(false)


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  })


  const [ready, setReady] = useState(false)


  const [isProcessing, setIsProcessing] = useState(false)




  useEffect(() => {

    const timer = setTimeout(() => {

      setReady(true)

    }, 100)


    return () => clearTimeout(timer)

  }, [])






  const handlePlaceOrder = (data) => {


    if (cart.length === 0) {

      showToast('Your cart is empty')

      return

    }


    setFormData(data)

    setShowLocationPopup(true)

  }







  const handleSelectLocation = (location) => {


    setShowLocationPopup(false)


    sendOrderToWhatsApp(
      location,
      formData
    )


  }



  const sendOrderToWhatsApp = (location, data) => {



    if (isProcessing) return


    setIsProcessing(true)



    const totalPrice = getTotalPrice()


    let message = '🍖 *NEW ORDER FROM HANKS BBQ* 🍖\n\n'


    message += `🏪 *Branch:* ${location.name}\n`

    message += `👤 *Name:* ${data.name}\n`

    message += `📞 *Phone:* ${data.phone}\n`

    message += `📍 *Address:* ${data.address}\n`



    if (data.note) {

      message += `📝 *Note:* ${data.note}\n`

    }




    message += '\n━━━━━━━━━━━━━━━━━━\n\n'


    message += '*ORDER DETAILS:*\n'





    cart.forEach(item => {


      message +=
      `• ${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}\n`


    })





    message += '\n━━━━━━━━━━━━━━━━━━\n'


    message +=
    `💰 *TOTAL: $${totalPrice.toFixed(2)}*\n\n`




    message +=
    '_Delivery fee calculated upon arrival._\n'



    message +=
    `Thank you for ordering from Hanks BBQ ${location.name}! 🍖🔥`







    const encodedMsg =
      encodeURIComponent(message)





    const whatsappUrl =
      `https://wa.me/${location.phone}?text=${encodedMsg}`





    window.open(
      whatsappUrl,
      '_blank'
    )






    clearCart()



    showToast(
      `Order sent to ${location.name}! 🍖`
    )







    setTimeout(() => {

      setIsProcessing(false)

    }, 2000)



  }









  if (!ready) {


    return (

      <>

        <div
          className="page-section"
          style={{ minHeight: '100vh' }}
        />


        <Footer />


      </>

    )


  }







  return (

    <>


      <div className="page-section">


        <div className="checkout-container">



          <div className="checkout-header">

            <h1 className="checkout-title">
              Checkout
            </h1>


          </div>





          <div className="checkout-grid">



            <CheckoutForm

              onSubmit={handlePlaceOrder}

              disabled={isProcessing}

            />





            <OrderSummary />



          </div>



        </div>


      </div>






      <Footer>

      </Footer>







      {showLocationPopup && (

        <LocationPopup

          onSelect={handleSelectLocation}

          onClose={() =>
            setShowLocationPopup(false)
          }

        />

      )}




    </>

  )




}


export default CheckoutPage