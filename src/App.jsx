import { useEffect, useRef, useState } from "react";
import "./App.css";

import image1 from "./assets/image2.jpeg";
import image2 from "./assets/image1.jpg";
import reshama1 from "./assets/reshama1.jpeg";
import reshama2 from "./assets/reshama2.jpeg";
import reshama3 from "./assets/reshama3.jpeg";
import messageBackgroundVideo from "./assets/video.mp4";

const galleryImages = [
  {
    src: image1,
    size: "large",
    caption: "Some moments just feel special",
    message: "Niku adhi special moment no kadho naku thelidhu but nenu matram eppatiki marchiponu. Nenu aa roju full ga enjoy chesanu. Naa life lo aa roju oka special memory ga undi. aa event id ippatiki na dhaggare vunnayi reshama",
  },
  {
    src: image2,
    size: "small",
    caption: "A good memory",
    message: "Naa dhaggara ni pics em levu, but appudu ila generate chesina oka photo undi. ",
  },
  {
    src: reshama1,
    size: "medium",
    caption: "A day to remember",
    message: "Each image ki message ivvalante nenu ivvalenu because aa moment lo nenu lenu akkada.",
  },
  {
    src: reshama2,
    size: "small",
    caption: "Little things, big smiles",
    message: "Ni photos em levu annakadha ivi ekkadivi ante nenu ni chat lo wallpaper ga pettiana images so ivi whatsApp lo save ayyivunnayi sry em anukoke...",
  },
  {
    src: reshama3,
    size: "large",
    caption: "More memories ahead",
    message: "last ga nenu ,nuvvu kalisi vunna photos emina vunnayi ante group pics ne single ga okkati kuda ledhu.",
  },
];

function GalleryMotion() {
  const pathRef = useRef(null);
  const particleRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const particle = particleRef.current;
    const orb = orbRef.current;
    const root = document.getElementById("root");
    const heightElements = [document.documentElement, document.body, root].filter(Boolean);
    const previousHeights = heightElements.map((element) => element.style.height);

    heightElements.forEach((element) => {
      element.style.height = "auto";
    });

    if (!path || !particle || !orb) {
      return () => {
        heightElements.forEach((element, index) => {
          element.style.height = previousHeights[index];
        });
      };
    }

    let animationFrame = 0;

    const updateMotion = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      const point = path.getPointAtLength(path.getTotalLength() * progress);

      particle.setAttribute("cx", point.x);
      particle.setAttribute("cy", point.y);
      orb.style.top = `${42 + progress * 12}%`;
      orb.style.transform = `rotateX(${progress * 240}deg) rotateY(${progress * 360}deg)`;
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateMotion);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(animationFrame);
      heightElements.forEach((element, index) => {
        element.style.height = previousHeights[index];
      });
    };
  }, []);

  return (
    <div className="gallery-motion" aria-hidden="true">
      <svg className="memory-constellation" viewBox="0 0 1200 2200" preserveAspectRatio="none">
        <path
          className="memory-connector-glow"
          d="M600 20 C430 170 210 210 290 365 S930 500 900 650 S330 820 300 990 S930 1130 900 1280 S360 1480 300 1740 C250 1900 420 2040 600 2160"
        />
        <path
          ref={pathRef}
          className="memory-connector"
          d="M600 20 C430 170 210 210 290 365 S930 500 900 650 S330 820 300 990 S930 1130 900 1280 S360 1480 300 1740 C250 1900 420 2040 600 2160"
        />
        <circle className="memory-node" cx="290" cy="365" r="7" />
        <circle className="memory-node" cx="900" cy="650" r="7" />
        <circle className="memory-node" cx="300" cy="990" r="7" />
        <circle className="memory-node" cx="900" cy="1280" r="7" />
        <circle className="memory-node" cx="300" cy="1740" r="7" />
        <circle className="memory-node" cx="600" cy="2160" r="7" />
        <circle ref={particleRef} className="memory-particle" cx="600" cy="20" r="8" />
      </svg>
      <div ref={orbRef} className="gallery-orb">
        <span className="gallery-orb-ring gallery-orb-ring-one" />
        <span className="gallery-orb-ring gallery-orb-ring-two" />
        <span className="gallery-orb-core" />
      </div>
    </div>
  );
}

function MessagesBackgroundVideo() {
  return (
    <video
      className="messages-scroll-video"
      src={messageBackgroundVideo}
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
      aria-hidden="true"
    />
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 801px)").matches,
  );

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 801px)");
    const updateDeviceLayout = () => setIsDesktop(desktopQuery.matches);

    desktopQuery.addEventListener("change", updateDeviceLayout);
    window.addEventListener("resize", updateDeviceLayout);
    return () => {
      desktopQuery.removeEventListener("change", updateDeviceLayout);
      window.removeEventListener("resize", updateDeviceLayout);
    };
  }, []);

  useEffect(() => {
    const pageHeightElements =
      currentPage === "messages"
        ? [document.documentElement, document.body, document.getElementById("root")]
            .filter(Boolean)
        : [];
    const previousHeights = pageHeightElements.map((element) => element.style.height);

    pageHeightElements.forEach((element) => {
      element.style.height = "auto";
    });

    if (currentPage === "messages") {
      window.scrollTo(0, 0);
    }

    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      pageHeightElements.forEach((element, index) => {
        element.style.height = previousHeights[index];
      });
    };
  }, [currentPage]);

  const navItems = ["Home", "Gallery", "Messages", "Wish"];

  const handleNavClick = (item) => {
    if (item === "Gallery") {
      setCurrentPage("gallery");
      return;
    }

    if (item === "Messages") {
      setCurrentPage("messages");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage("home");

    if (item !== "Home") {
      const sectionId = item.toLowerCase();
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isDesktop) {
    return (
      <main className="desktop-only-page">
        <div className="desktop-only-card">
          <div className="desktop-only-icon" aria-hidden="true">
            <svg viewBox="0 0 64 52" fill="none">
              <rect x="9" y="5" width="46" height="33" rx="3" />
              <path d="M4 45h56l-5-7H9l-5 7Z" />
              <path d="M25 45h14" />
            </svg>
          </div>
          <p className="desktop-only-eyebrow">MADE FOR A BIGGER SCREEN</p>
          <h1>Please open on a laptop or PC</h1>
          <p className="desktop-only-description">
            This birthday experience is designed to be viewed on a laptop or
            desktop computer. Please open this website on one to continue.
          </p>
          <span className="desktop-only-heart" aria-hidden="true">♥</span>
        </div>
      </main>
    );
  }

  if (currentPage === "gallery") {
    return (
      <div className="gallery-page page">
        <GalleryMotion />
        <header className="gallery-header">
          <div className="logo">
            <span className="logo-icon">🎂</span>
            <span className="logo-white">Birth</span>
            <span className="logo-orange">Day</span>
          </div>

          <button
            type="button"
            className="back-button"
            onClick={() => {
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ← Back to home
          </button>
        </header>

        <main className="gallery-content">
          <div className="gallery-intro reveal">
            <p className="eyebrow">THE MEMORIES</p>
            <h2>
              A little gallery
              <br />
              of our <span>favorite moments.</span>
            </h2>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                className={`gallery-entry reveal ${image.size}`}
                key={index}
              >
                <div className="gallery-photo">
                  <img
                    src={image.src}
                    alt={`Memory ${index + 1}`}
                    className="gallery-image"
                  />
                </div>
                <div className="gallery-caption">
                  <p className="gallery-memory-number">MEMORY {String(index + 1).padStart(2, "0")}</p>
                  <h3>{image.caption}</h3>
                  <p>{image.message}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="gallery-finale reveal" aria-labelledby="gallery-finale-title">
            <div className="gallery-finale-frame" aria-hidden="true">
              <span className="finale-frame-corner finale-frame-corner-top-left" />
              <span className="finale-frame-corner finale-frame-corner-top-right" />
              <span className="finale-frame-corner finale-frame-corner-bottom-left" />
              <span className="finale-frame-corner finale-frame-corner-bottom-right" />
              <span className="finale-frame-orbit finale-frame-orbit-one" />
              <span className="finale-frame-orbit finale-frame-orbit-two" />
              <span className="finale-frame-glow" />
            </div>
            <div className="gallery-finale-caption">
              <p className="gallery-memory-number">ONE MORE MEMORY</p>
              <h3 id="gallery-finale-title">The photo we haven’t taken yet.</h3>
              <p>
                E empty frame mana idhari pic kosam. Nenu chala times pic thisukovali anukunna but kudhara ledhu inka eppatiki kudharadhu reshama. idhi na eppatiki thirani small wish.
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (currentPage === "messages") {
    return (
      <div className="messages-page page">
        <div className="messages-page-atmosphere" aria-hidden="true">
          <MessagesBackgroundVideo />
          <span className="messages-light messages-light-one" />
          <span className="messages-light messages-light-two" />
          <span className="messages-light messages-light-three" />
          <span className="messages-star messages-star-one">✦</span>
          <span className="messages-star messages-star-two">✧</span>
          <span className="messages-star messages-star-three">✦</span>
          <span className="messages-star messages-star-four">✧</span>
        </div>
        <header className="gallery-header">
          <div className="logo">
            <span className="logo-icon">🎂</span>
            <span className="logo-white">Birth</span>
            <span className="logo-orange">Day</span>
          </div>

          <button
            type="button"
            className="back-button"
            onClick={() => {
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ← Back to home
          </button>
        </header>

        <main className="messages-page-content">
          <div className="messages-page-heading reveal">
            <p className="eyebrow">A FEW WORDS</p>
            <h1>
              Hey...
              <br />
              <span>Reshama,</span>
            </h1>
            <p className="intro-text">Inni days tharuvatha nitho em matladalo kuda naku telidhu emina thappuga matladithe em anukoku</p>
          </div>

          <div className="conversation messages-page-conversation">
            <div className="conversation-line line-1 reveal">
              <span className="quote-mark">“</span>
              <p>
                Naku ninnu malli distrub cheyyali ani ledhu, and nenu ila wish chesthundhi kuda nuvvu malli natho matladali anna expectation tho kadhu. naku nitho matladali anipinchi niku ila chepthunna. dhiniki nuvvu respond kuda avvaku. Naku heart full ga nitho matladani ani vundhi..
              </p>
            </div>

            <div className="conversation-line line-2 reveal">
              <p>
                Ela vunnavu Reshama..? 
                Na life lo nijam ga nuvvu chala important person. naku chala nerpinchavu. evaritho ela vundalo cheppavu chala cheppavu ila. nenu chala nerchukunnanu. and nenu nitho close ayyinantha ekkuvaga evaritho avvaledhu ippatiki kuda, You are my forever best friend. manam matladukunna matladukokapoyina naku nuvvu eppudu best friend ga vuntavu. nuvvu natho vunte niku ela vuntadho naku telidhu but naku matram nuvvu natho vunte chala happy ga vuntahi chala confident ga vuntanu dhenilo ayina nenu chese prathi work lo nuvvu support chesthavu.. cheppalii ante na ippativaraku na behaviour gurinchi evariki ayina cheppali ante 2ways ga chepthanu 1. nuvvu paricham avvaka mundhu and 2. nuvvu parichayam ayyina tharuvatha. naku ippudu thelusthundhi nenu chala change ayyanu, not bad. nitho nenu chala thakkuva time lone close ayyanu and alane thakkuva time ne nitho best friend ga kuda vunna... nenu instagram lo eppudu friends godavalu chusina naku nuvvu gurthuvasthavu, chala happy ga feel avuthanu manam kuda ala godavalu adukunevalamu ani. naku ma annaya ni valla frd ni chusinappudu kuda nuvvu gurthuvasthavu vallu idharu kuda chala baguntaru close ga thittukuntu, kottukuntu saradhaga. So nenu future lo Btech life eppudu gurthuku vachina naku 1st gurthuku vachedhi nuvvu 100%. inka chala vunnayi nitho happy ga anipinchevi enjoy chesinavi..
              </p>
            </div>

            <div className="conversation-line line-3 reveal">
              <p>
               Naku malli past gurinchi thevali ani ledhu. but nenu chala bad ga behave chesanu naku thelusthundhi. but nenu appudu ala kavali ani cheyyaledhu only nuvvu naku ekkada dhooram ayyipothavu anna bayam thone ala chesanu reshama anthaku minchi em ledhu. chivariki bayapadinatte dhooram ayyipoyavu. nenu gurthukuvasthunnana reshama niku okkasari ayina inni days lo. nenu chala times try chesanu nitho malli just frd ga ayina vundhamu ani but niku ala kuda nachadam ledu natho vundadam. anthe adhi ni istam nenu force cheyyadam ledhu. nenu eppudu aigina ippudu ila bagane vuntunnamu kadha antavu, nuvvu ela vunnavo naku thelidhu rehsma but naku matram ila assala nachadam ledhu assala bagoledhu.ala ani ippudu matladamanadam ledhu. nenu ni life lo vunte nuvvu mundhuku vellalevu nenu ninnu chala distrub chesthanu. so nenu inka fix ayyanu ninnu eppatiki distrub cheyyakudadhu ani. naku endhuko okati anipisthundhi nuvvvu settle ayyaka malli manam kalusthamu amo ani. I’m waiting for that day.. nilo vunna past reshama chudali ani vundhi, but vadhule vunna malli na valla chala suffer avuthavu adhi naku istam ledhu. 
              </p>
            </div>
               <div className="conversation-line line-3 reveal">
                <p>
                  And Last, nakosam intha time spend chesinandhuku tq so much. always be happy. and this messages is  my last messages. malli ni next bdays ki kaludham. byee....
                </p>
            </div>
            <div className="conversation-line line-3 reveal">
                <p>
                    Congratulations Reshamaaa... Cognizant lo job vachinanduku! <br/>

                    I feel really proud and happy. Antha dooram nunchi vasthunna, job raakapothe baagodu ani feel ayyedhanivi kadhaa... chivariki job kottavu. Super! <br/>

                    Once again, congratulations Reshaamaa! 🎉
                </p>
            </div>
          </div>

          <p className="messages-page-signoff reveal">Always wishing you the very best. <span>♥</span></p>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🎂</span>
          <span className="logo-white">Birth</span>
          <span className="logo-orange">Day</span>
        </div>

        <nav className="nav-links">
          {navItems.map((item, index) => (
            <button
              type="button"
              className={index === 0 ? "nav-link active" : "nav-link"}
              key={item}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <section id="home" className="section hero-section">
        <div className="ambient-glow"></div>

        <div className="scene reveal scene-reveal">
          <img src="/bachground.png" alt="Birthday scene" className="scene-image" />
        </div>

        <div className="hero-text reveal">
          <p className="small-label">A LITTLE SOMETHING FOR YOU</p>

          <h1>
            Happy
            <span> Birthday</span>
          </h1>

          <p className="hero-description">Some moments deserve to be remembered forever.</p>

          <div className="scroll-hint">
            <span>Scroll to continue</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </section>

      <section id="gallery" className="section gallery-section">
        <div className="content-container">
          <div className="section-number">01</div>

          <div className="section-heading reveal">
            <p className="eyebrow">THE MEMORIES</p>

            <h2>
              Some moments
              <br />
              are simply <span>special.</span>
            </h2>
          </div>

          <div className="memory-grid">
            <div className="memory-card card-large reveal">
              <img src={image1} alt="Reshama memory 1" className="memory-image" />
            </div>

            <div className="memory-card reveal">
              <img src={image2} alt="Reshama memory 2" className="memory-image" />
            </div>
          </div>

          <p className="section-description reveal">
            Mana madhya unna memories anni perfect ga undakapovachu, konni silly, konni crazy,
            konni unforgettable...
          </p>
        </div>
      </section>

      <section id="messages" className="section message-section">
        <div className="content-container message-container">
          <div className="section-number">02</div>

          <div className="message-intro reveal">
            <p className="eyebrow">A FEW WORDS</p>

            <h2>
              Hey...
              <br />
              honestly,
            </h2>

            <p className="intro-text">I don't even know how to start this.</p>
          </div>

          <div className="conversation">
            <div className="conversation-line line-1 reveal">
              <span className="quote-mark">“</span>

              <p>
                Nuvvu naa life lo just oka friend kaadu. Somehow, you became one of those
                people I can talk to about anything, laugh with for no reason, and just be
                myself around.
              </p>
            </div>

            <div className="conversation-line line-2 reveal">
              <p>
                Sometimes we may not talk every day, sometimes life gets busy, but that doesn't
                really change how much you mean to me.
              </p>
            </div>

            <div className="conversation-line line-3 reveal">
              <p>
                I'm genuinely happy that I met you and that you became such an important part
                of my life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section thankyou-section">
        <div className="thankyou-content reveal">
          <p className="eyebrow">ONE LAST THING</p>

          <h2>
            Thank you
            <br />
            <span>for being you.</span>
          </h2>

          <div className="heart">❤️</div>
        </div>
      </section>

      <section id="wish" className="section surprise-section">
        <div className="surprise-content reveal">
          <p className="eyebrow">AND FINALLY...</p>

          <h2>
            Happy Birthday,
            <br />
            <span style={{ margin: "30px 0", display: "inline-block" }}>my dear friend.</span>
            <br />
            <span style={{ color: "#ffffff" }}>Reshama..</span>
          </h2>

          <p className="birthday-message">
            I hope this day gives you at least a little bit of the happiness you bring into the
            lives of the people around you.
          </p>

        </div>
      </section>

      <footer className="footer">
        <p>Made with ❤️</p>
        <span>For someone special.</span>
      </footer>


    </div>
  );
}

export default App;