import React from 'react'
import { Receipt } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'


export const OrderSummary = () => {

  const {
    cart,
    removeFromCart,
    changeQty,
    getTotalPrice
  } = useCart()


  const totalPrice = getTotalPrice()



  return (

    <div className="order-summary">

      <div className="summary-card">


        <h3 className="summary-title">

          <Receipt size={22} />

          Order Summary

        </h3>



        {cart.length === 0 ? (

          <div className="empty-cart">

            Your cart is empty.
            <br />

            <Link to="/menu?mode=delivery">
              Browse Menu
            </Link>

          </div>


        ) : (


          <>


            <div className="summary-items">


              {cart.map((item) => (

                <div
                  key={item.key}
                  className="checkout-item"
                >


                  <div className="checkout-item-img">

                    <img
                      src={item.image || ''}
                      alt={item.name}
                      onError={(e) =>
                        e.target.style.display = 'none'
                      }
                    />

                  </div>



                  <div className="checkout-item-info">

                    <div className="checkout-item-name">
                      {item.name}
                    </div>

                    <div className="checkout-item-price">
                      ${item.price.toFixed(2)} each
                    </div>

                  </div>



                  <div className="checkout-qty-controls">

                    <button
                      className="qty-btn"
                      onClick={() =>
                        changeQty(item.key, -1)
                      }
                    >
                      −
                    </button>


                    <span className="qty-value">
                      {item.qty}
                    </span>


                    <button
                      className="qty-btn"
                      onClick={() =>
                        changeQty(item.key, 1)
                      }
                    >
                      +
                    </button>

                  </div>



                  <div className="checkout-item-total">

                    ${(item.price * item.qty).toFixed(2)}

                  </div>



                  <button
                    className="remove-item"
                    onClick={() =>
                      removeFromCart(item.key)
                    }
                  >

                    ✕

                  </button>


                </div>

              ))}


            </div>



            <div className="summary-total">

              <span>Total</span>

              <span>
                ${totalPrice.toFixed(2)}
              </span>

            </div>



            <p className="delivery-note">
              *Delivery fee is handled by the delivery service.
            </p>



          </>

        )}



        <Link
          to="/menu?mode=delivery"
          className="back-menu-btn"
        >

          Back to Menu

        </Link>


      </div>


    </div>

  )

}