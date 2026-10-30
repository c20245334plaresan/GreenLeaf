gsap.registerPlugin(ScrollTrigger);
const darkModeToggle = document.querySelector("#darkModeToggle");

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");
    });
}



gsap.set(["#heroTitle", "#heroText", "#heroButtons"], {
    opacity: 0,
    y: 30
});

// One timeline with defaults and multiple animation steps
const introTimeline = gsap.timeline({
    defaults: {
        duration: 0.7,
        ease: "power2.out"
    }
});

// power2.out slows smoothly at the end, giving the intro a natural finish.
introTimeline
    .to("#heroTitle", {
        opacity: 1,
        y: 0
    })
    
    .to("#heroText", {
        opacity: 1,
        y: 0,
        ease: "back.out(1.4)"
    }, "-=0.4")
  
    .to("#heroButtons", {
        opacity: 1,
        y: 0,
        ease: "power2.out"
    }, "-=0.3")
  
    .from(".nav-link", {
        opacity: 0,
        y: -10,
        stagger: 0.1,
        duration: 0.4,
        ease: "power1.out"
    }, "-=0.3");


const replayBtn = document.querySelector("#replayBtn");

if (replayBtn) {
    replayBtn.addEventListener("click", function () {
        introTimeline.restart();
    });
}



const mm = gsap.matchMedia();

mm.add(
    {
       
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)"
    },
    function (context) {
        const { reduceMotion, normalMotion } = context.conditions;

       
        if (reduceMotion) {
            gsap.set(".reveal", {
                opacity: 1,
                y: 0,
                clearProps: "transform"
            });

            gsap.set("#progressBar", {
                scaleX: 1,
                transformOrigin: "left"
            });

            return;
        }

        if (normalMotion) {
           
            gsap.utils.toArray(".reveal").forEach(function (section) {
                gsap.fromTo(
                    section,
                    {
                        opacity: 0,
                        y: 40
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

           
            gsap.fromTo(
                "#progressBar",
                {
                    scaleX: 0,
                    transformOrigin: "left"
                },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true
                    }
                }
            );
        }
    }
);


const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Thank you for contacting GreenLeaf Plant Shop!");

        contactForm.reset();
    });
}
