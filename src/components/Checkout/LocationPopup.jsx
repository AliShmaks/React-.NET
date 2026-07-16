import React, { useEffect } from 'react'


const locations = [
  {
    name: 'Khaldeh',
    phone: '96176002206',
    display: '76 002 206'
  },
  {
    name: 'Dahye',
    phone: '96181600699',
    display: '81 600 699'
  },
  {
    name: 'Jneh',
    phone: '96181863086',
    display: '81 863 086'
  }
]



export const LocationPopup = ({
  onSelect,
  onClose
}) => {


  useEffect(() => {

    document.body.style.overflow = 'hidden'


    return () => {

      document.body.style.overflow = ''

    }

  }, [])



  return (

    <div
      className="location-popup"
      onClick={onClose}
    >


      <div
        className="location-popup-content"
        onClick={(e) => e.stopPropagation()}
      >


        <div className="location-popup-header">


          <h3>
            📍 Select Your Branch
          </h3>


          <button
            className="location-popup-close"
            onClick={onClose}
          >

            &times;

          </button>


        </div>




        <div className="location-popup-body">

          <p>
            Which Hanks BBQ branch would you like to order from?
          </p>



          <div className="location-options">


            {locations.map((loc) => (

              <button
                key={loc.phone}
                className="location-option"
                onClick={() => onSelect(loc)}
              >

                <span className="loc-name">
                  {loc.name}
                </span>


                <span className="loc-phone">
                  {loc.display}
                </span>


              </button>

            ))}


          </div>


        </div>


      </div>


    </div>

  )

}