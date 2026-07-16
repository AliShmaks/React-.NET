import React, { useEffect, useRef } from 'react'
import { Footer } from '../components/Layout'
import { Link } from 'react-router-dom'

// Import images
import logo from '/logo.webp'
import mid from '/mid.webp'
import leftch from '/leftch.webp'
import rightch from '/rightch.webp'
import midbur from '/midbur.webp'
import rightbur from '/rightbur.webp'
import leftbur from '/leftbu.webp'
import wingsleft from '/wingsleft.webp'
import wingsright from '/wingsright.webp'
import twister from '/twister.webp'
import esc from '/esc.webp'


const Home = () => {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const burgerRef = useRef(null)
  const headerRef = useRef(null)
  const sideLeftRef = useRef(null)
  const sideRightRef = useRef(null)
  const deliveryTextRef = useRef(null)
  const deliveryBurgerRef = useRef(null)
  const burgerLeftRef = useRef(null)
  const burgerRightRef = useRef(null)
  const glowRef = useRef(null)
  const doubleTextRef = useRef(null)
  const doubleLeftRef = useRef(null)
  const doubleRightRef = useRef(null)
  const underLeftRef = useRef(null)
  const underRightRef = useRef(null)

  // ===== REFS FOR WINGS UNLEASHED =====
  const wingsTextRef = useRef(null)
  const wingsLeftRef = useRef(null)
  const wingsRightRef = useRef(null)

  // ===== REFS FOR ABOUT US SECTION =====
  const aboutSectionRef = useRef(null)
  const aboutTitleRef = useRef(null)
  const aboutDescRef = useRef(null)
  const aboutBtnRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const gsapModule = await import('gsap')
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.default
      const ScrollTrigger = ScrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      const isMobile = window.innerWidth <= 768


// ===== SIDE BURGERS - GENTLE BOBBING (UP/DOWN) =====
// Left burger bobs up and down in place
gsap.to(sideLeftRef.current, {
  y: '-15px',      // ← Moves UP 15px
  duration: 1.1,   // ← 2 seconds for one cycle
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1
})

// Right burger bobs up and down in place
gsap.to(sideRightRef.current, {
  y: '-15px',      // ← Moves UP 15px
  duration: 1.1,  
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1
})

 // 2️⃣ MAIN BURGER
    gsap.to(burgerRef.current, {
      y: '-15px',
      duration: 1.1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    })

// ===== SIDE BURGERS - SLIDE IN ON ENTRY =====
// Left burger slides in from LEFT
gsap.to(sideLeftRef.current, {
  opacity: 1,
  x: 0,
  scale: 1,
  duration: 1.2,
  ease: 'power4.out',

})

// Right burger slides in from RIGHT
gsap.to(sideRightRef.current, {
  opacity: 1,
  x: 0,
  scale: 1,
  duration: 1.2,
  ease: 'power4.out',

})

      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
          invalidateOnRefresh: true
        },
        defaults: { ease: 'power1.inOut' }
      })

      // 1️⃣ MAIN BURGER: 100vh → 10vh
      tl.to(burgerRef.current, {
        marginTop: '1.5vh',
        duration: 1.0,
        ease: 'power2.inOut'
      }, 0)

      // 2️⃣ HEADER SECTION: fades out
      tl.to(headerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0.3)

      // 3️⃣ SIDE BURGERS: fade out
    tl.to(sideLeftRef.current, {
  opacity: 0,
  x: '-100vw',
  scale: 0.6,
  duration: 1.5,
  ease: 'power3.inOut'
}, 0.3)

      tl.to(sideRightRef.current, {
  opacity: 0,
  x: '100vw',
  scale: 0.6,
  duration: 1.5,
  ease: 'power3.inOut'
}, 0.3)

      // 4️⃣ MAIN BURGER: grows BIG
      tl.to(burgerRef.current, {
        scale: 14,
        duration: 1.8,
        ease: 'power2.inOut'
      }, 1.0)

      // 5️⃣ MAIN BURGER: fades out
      tl.to(burgerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      }, 2.3)

     // 6️⃣ DELIVERY TEXT + BURGER: fade IN
tl.fromTo(deliveryTextRef.current, {
  opacity: 0,
  y: 60,
  scale: 0.9
}, {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 1.5,
  ease: 'power2.out'
}, 2.5)

// DELIVERY BURGER - Starts small, grows big
tl.fromTo(deliveryBurgerRef.current, {
  opacity: 0,
  scale: 0.4
}, {
  opacity: 1,
  scale: 1.1,
  duration: 1.5,
  ease: 'power2.out'
}, 2.5)

// 7️⃣ DELIVERY BURGER CONTINUES GROWING
tl.to(deliveryBurgerRef.current, {
  scale: 1.6,
  duration: 1.0,
  ease: 'power1.inOut'
}, 3.5)

// 8️⃣ DELIVERY BURGER GROWS TO FINAL SIZE AND STOPS
tl.to(deliveryBurgerRef.current, {
  scale: 2.0,
  duration: 0.8,
  ease: 'power1.inOut'
}, 4.2)

// ===== NEW: DELIVERY BURGER FADES OUT + SHRINKS =====
tl.to(deliveryBurgerRef.current, {
  opacity: 0,
  scale: 0.5,  // Shrinks as it fades
  duration: 1.5,
  ease: 'power2.inOut'
}, 5.5)  // ← Starts fading after it reaches full size


      // 8️⃣ GLOW pulse
      tl.to(glowRef.current, {
        scale: 2,
        opacity: 0.5,
        duration: 1.8,
        ease: 'power2.inOut'
      }, 1.0)

      tl.to(glowRef.current, {
        scale: 1,
        opacity: 0.2,
        duration: 1.0
      }, 2.5)

      // FADE OUT 3 BURGERS + DELIVERY TEXT
      tl.to(burgerLeftRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.6)

      tl.to(burgerRightRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.6)

      tl.to(deliveryTextRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.6)

      tl.to(deliveryBurgerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 3.6)

      // ===== SHOW THE DOUBLE TEXT SECTION =====
      tl.to(doubleTextRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out'
      }, 4.2)

      // =============================================
      // MOBILE vs DESKTOP
      // =============================================
      
      if (isMobile) {
        // MOBILE: Twister
        tl.fromTo(doubleLeftRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 40
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out'
        }, 3.6)

        tl.fromTo(underLeftRef.current, {
          opacity: 0,
          x: '-100vw',
          scale: 0.7
        }, {
          opacity: 1,
          x: '-40vw',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 4.0)

        tl.to(doubleLeftRef.current, {
          opacity: 0,
          y: -80,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 5.0)

        tl.to(underLeftRef.current, {
          opacity: 0,
          y: -80,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 5.0)

// MOBILE: SLIDE-IN BURGERS
tl.to(burgerLeftRef.current, {
  opacity: 0.85,
  x: '-45vw',  // ← mobile value - travels less
  scale: 0.97,
  duration: 1.2,
  ease: 'power3.out'
}, 2.8)

tl.to(burgerRightRef.current, {
  opacity: 1,
  x: '45vw',   // ← mobile value - travels less
  scale: 1,
  duration: 1.2,
  ease: 'power3.out'
}, 2.8)
        
        // MOBILE: ESC
        tl.fromTo(doubleRightRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 60
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out'
        }, 6.0)

        tl.fromTo(underRightRef.current, {
          opacity: 0,
          x: '100vw',
          scale: 0.7
        }, {
          opacity: 1,
          x: '200',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 6.3)

        tl.to(doubleRightRef.current, {
          opacity: 0,
          y: -80,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 7.5)

        tl.to(underRightRef.current, {
          opacity: 0,
          y: -80,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 7.5)

               // MOBILE: WINGS - Appear with opacity 1
        tl.fromTo(wingsTextRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 40
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out'
        }, 8.0)

        tl.fromTo(wingsLeftRef.current, {
          opacity: 0,
          x: '-60vw',
          scale: 0.7
        }, {
          opacity: 1,  // Changed from 0 to 1
          x: '-25vw',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 8.5)

        tl.fromTo(wingsRightRef.current, {
          opacity: 0,
          x: '60vw',
          scale: 0.7
        }, {
          opacity: 1,  // Changed from 0 to 1
          x: '30vw',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 8.5)

      } else {
        // DESKTOP: Twister  & ESC SIDE BY SIDE
        tl.fromTo(doubleLeftRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 0,
          x: 0
        }, {
          opacity: 1,
          scale: 0.9,
          y: 0,
          x: 0,
          duration: 1.5,
          ease: 'power2.out'
        }, 4.6)

        tl.fromTo(doubleRightRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 0,
          x: 0
        }, {
          opacity: 1,
          scale: 0.9,
          y: 0,
          x: 0,
          duration: 1.5,
          ease: 'power2.out'
        }, 4.6)

// DESKTOP: SLIDE-IN BURGERS
tl.to(burgerLeftRef.current, {
  opacity: 0.85,
  x: '-26vw',  // ← desktop value
  scale: 0.97,
  duration: 1.2,
  ease: 'power3.out'
}, 2.8)

tl.to(burgerRightRef.current, {
  opacity: 1,
  x: '24vw',   // ← desktop value
  scale: 1,
  duration: 1.2,
  ease: 'power3.out'
}, 2.8)


        tl.fromTo(underLeftRef.current, {
          opacity: 0,
          x: '-100vw',
          scale: 0.8
        }, {
          opacity: 1,
          x: '0',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 5.0)

        tl.fromTo(underRightRef.current, {
          opacity: 0,
          x: '100vw',
          scale: 0.8
        }, {
          opacity: 1,
          x: '0',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 5.0)

        tl.to(doubleLeftRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power1.inOut'
        }, 5.8)

        tl.to(underLeftRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power1.inOut'
        }, 5.8)



        tl.to(doubleRightRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power1.inOut'
        }, 5.8)

        tl.to(underRightRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power1.inOut'
        }, 5.8)

        // DESKTOP: WINGS
        tl.fromTo(wingsTextRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 40
        }, {
          opacity: 1,
          scale: 0.9,
          y: 0,
          duration: 1.5,
          ease: 'power2.out'
        }, 6.5)

        tl.fromTo(wingsLeftRef.current, {
          opacity: 0,
          x: '-60vw',
          scale: 0.7
        }, {
          opacity: 1,
          x: '15vw',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 7.0)

        tl.fromTo(wingsRightRef.current, {
          opacity: 0,
          x: '60vw',
          scale: 0.7
        }, {
          opacity: 1,
          x: '-15vw',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 7.0)
      }

      // ===== WINGS FADE OUT + ABOUT US FADE IN =====
      tl.to(wingsTextRef.current, {
        opacity: 0,
        duration: 2.0,
        ease: 'power1.inOut'
      }, 9.0)

      tl.to(wingsLeftRef.current, {
        opacity: 0,
        duration: 2.0,
        ease: 'power1.inOut'
      }, 9.0)

      tl.to(wingsRightRef.current, {
        opacity: 0,
        duration: 2.0,
        ease: 'power1.inOut'
      }, 9.0)

      tl.to(aboutSectionRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out'
      }, 9.2)

      tl.fromTo(aboutTitleRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 40
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out'
      }, 9.4)

      tl.fromTo(aboutDescRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out'
      }, 9.7)

      tl.fromTo(aboutBtnRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, 10.0)

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }

    loadGSAP()
  }, [])

  return (
    <>
 
      
      <section className="section" ref={sectionRef}>
        <div className="sticky-wrap" ref={stickyRef}>
          <div className="bg-glow" ref={glowRef}></div>

       {/* HEADER SECTION */}
<div className="header-section" ref={headerRef}>
  <div className="main-title">SHMAK'S BBQ</div>
  <div className="tagline">Juicy burgers, smoky BBQ, and fresh wraps crafted with passion, served with flavor.</div>
  <div className="header-buttons">
    <Link to="/menu?mode=dinein" className="btn-header btn-dine-header">
      <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
  <path d="M7 2v20"/>
  <path d="M21 15v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4"/>
  <path d="M21 7v8"/>
  <path d="M16 7v8"/>
  <path d="M16 2v5a2 2 0 0 0 2 2h3"/>
</svg>
      Dine In
    </Link>
    <Link to="/menu?mode=delivery" className="btn-header btn-delivery-header">
     <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="5.5" cy="17.5" r="2.5"/>
  <circle cx="18.5" cy="17.5" r="2.5"/>
  <path d="M15 6a1 1 0 0 0-1-1h-2v4h2a1 1 0 0 0 1-1V6z"/>
  <path d="M12 5v10"/>
  <path d="M5 15v-3a2 2 0 0 1 2-2h10"/>
  <path d="M8 10l2-2m4 2l2-2"/>
  <path d="M8 10l2 2m4-2l2 2"/>
</svg>
      Delivery
    </Link>
  </div>
</div>

          {/* SIDE BURGERS */}
          <img 
            className="side-burger side-burger-left" 
            ref={sideLeftRef}
            src={leftch} 
            alt="Burger left"
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=200' }}
          />
          <img 
            className="side-burger side-burger-right" 
            ref={sideRightRef}
            src={rightch} 
            alt="Burger right"
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=200' }}
          />

          {/* MAIN BURGER */}
          <img 
            className="burger" 
            ref={burgerRef}
            src={mid} 
            alt="Double-Double Burger"
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=256' }}
          />

          {/* SLIDE-IN BURGERS */}
          <img 
            className="burger-left" 
            ref={burgerLeftRef}
            src={leftbur} 
            alt="Burger left"
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=200' }}
          />
          <img 
            className="burger-right" 
            ref={burgerRightRef}
            src={rightbur} 
            alt="Burger right"
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=200' }}
          />

          {/* DELIVERY TEXT */}
          <div className="delivery-text" ref={deliveryTextRef}>
            <h1>Good things come in threes.</h1>
            <p>with jalapeño poppers • 100% fresh</p>
          </div>

          <img 
            className="delivery-burger" 
            ref={deliveryBurgerRef}
            src={midbur} 
            alt="Double-Double Burger"
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=200' }}
          />

          {/* ===== DOUBLE TEXT SECTION - Twister & ESC WITH LOGOS ===== */}
          <div className="double-text-section" ref={doubleTextRef}>
            {/* LEFT SIDE - Twister */}
            <div className="double-text-left" ref={doubleLeftRef}>
              {/* Shmaks BBQ LOGO ABOVE TEXT */}
              <img 
                src={logo} 
                alt="Shmaks BBQ" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%',
                  margin: '0 auto 15px',
                  display: 'block',
                  objectFit: 'cover',
                  border: '2px solid #8B1A1A'
                }}
              />
              <div style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(249, 115, 22, 0.3)',
                lineHeight: '1.2'
              }}>
              Twister
              </div>
              <div style={{ 
                fontSize: 'clamp(0.7rem, 1.5vw, 1.2rem)',
                letterSpacing: '10px',
                opacity: 0.8,
                marginTop: '6px',
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                fontWeight: 500
              }}>
                SANDWICH
              </div>
            </div>

            {/* RIGHT SIDE - ESC */}
            <div className="double-text-right" ref={doubleRightRef}>
              {/* Shmaks BBQ LOGO ABOVE TEXT */}
              <img 
                src={logo} 
                alt="Shmaks BBQ" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%',
                  margin: '0 auto 15px',
                  display: 'block',
                  objectFit: 'cover',
                  border: '2px solid #8B1A1A'
                }}
              />
              <div style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(249, 115, 22, 0.3)',
                lineHeight: '1.2'
              }}>
                Escalope 
              </div>
              <div style={{ 
                fontSize: 'clamp(0.7rem, 1.5vw, 1.2rem)',
                letterSpacing: '10px',
                opacity: 0.8,
                marginTop: '6px',
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                fontWeight: 500
              }}>
                SANDWICH
              </div>
            </div>
          </div>

          {/* UNDER IMAGES - twister & esc (sandwich photos) */}
          <img 
            className="under-image-left" 
            ref={underLeftRef}
            src={twister} 
            alt="twister"
            style={{ 
              position: 'absolute', 
              left: '-20%', 
              width: '1000px', 
              height: 'auto', 
              zIndex: 25, 
              pointerEvents: 'none', 
              borderRadius: '12px' 
            }}
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=200' }}
          />
          <img 
            className="under-image-right" 
            ref={underRightRef}
            src={esc} 
            alt="esc"
            style={{ 
              position: 'absolute', 
              right: '-20%', 
              width: '1000px', 
              height: 'auto', 
              zIndex: 25,
              pointerEvents: 'none', 
              borderRadius: '12px' 
            }}
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍔?size=200' }}
          />

          {/* ===== WINGS UNLEASHED ===== */}
          <div className="wings-section" ref={wingsTextRef}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              textShadow: '0 0 40px rgba(249, 115, 22, 0.2)',
              marginBottom: '10px'
            }}>
              WINGS UNLEASHED
            </h1>
            <p style={{
              fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
              color: '#aaa',
              letterSpacing: '8px',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>
              HONEY MUSTARD • BBQ • CRISPY
            </p>
          </div>

          {/* WINGS IMAGES */}
          <img 
            className="wings-image-left"
            ref={wingsLeftRef}
            src={wingsleft} 
            alt="Honey Mustard Wings"
            style={{ 
              position: 'absolute', 
              left: '5%', 
              top: '45%',
              width: '400px', 
              height: 'auto', 
              zIndex: 35, 
              opacity: 0, 
              pointerEvents: 'none', 
              borderRadius: '12px' 
            }}
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍗?size=200' }}
          />
          <img 
            className="wings-image-right"
            ref={wingsRightRef}
            src={wingsright} 
            alt="BBQ Wings"
            style={{ 
              position: 'absolute', 
              right: '5%', 
              top: '45%',
              width: '400px', 
              height: 'auto', 
              zIndex: 36, 
              opacity: 0, 
              pointerEvents: 'none', 
              borderRadius: '12px' 
            }}
            onError={(e) => { e.target.src = 'https://emojicdn.elk.sh/🍗?size=200' }}
          />

        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="about-section-new" ref={aboutSectionRef}>
        <div className="about-container">
          <h1 ref={aboutTitleRef}>About Us</h1>
          <p ref={aboutDescRef}>
            At Shmaks BBQ, we're passionate about crafting the perfect burger experience. 
            From our signature Double-Double to our famous wings, every bite is made with 
            love and the finest ingredients. Join us and taste the difference!
          </p>
          <Link to="/menu?mode=dinein" className="about-btn" ref={aboutBtnRef}>Explore Our Menu</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home