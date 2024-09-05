document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

document.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    const scrollY = window.scrollY;

    // Calculate the margin-top value based on scroll position
    let marginTopValue = scrollY / 5; // Slowly adds `mt-4` equivalent as you scroll up

    // Ensure margin-top doesn't exceed 16px (mt-4)
    if (marginTopValue > 16) {
        marginTopValue = 16;
    }

    header.style.marginTop = marginTopValue + 'px';
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollElements = document.querySelectorAll("[data-scroll]");
    let lastScrollTop = 0;

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutOfView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const displayScrollElement = (element) => {
        const letters = element.querySelectorAll(".letter");
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.opacity = '1';
            }, index * 100); // Adjust the stagger timing here
        });
        element.classList.add("opacity-100");
        element.classList.remove("opacity-0");
    };

    const hideScrollElement = (element) => {
        element.classList.add("opacity-0");
        element.classList.remove("opacity-100");
    };

    const handleScrollAnimation = () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                if (st > lastScrollTop) {
                    // Scrolling down
                    displayScrollElement(el);
                } else {
                    // Scrolling up
                    displayScrollElement(el);
                }
            } else if (elementOutOfView(el)) {
                hideScrollElement(el);
            }
        });
        lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // Initial check
    handleScrollAnimation();
});

document.addEventListener("DOMContentLoaded", function () {
    const elementsToAnimate = document.querySelectorAll("[data-animate]");

    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    };

    const handleScrollAnimation = () => {
        elementsToAnimate.forEach(el => {
            if (elementInView(el)) {
                el.classList.add(el.getAttribute("data-animate"));
            } else {
                el.classList.remove(el.getAttribute("data-animate"));
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Initial check
});
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector("footer");

    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    };

    const handleScrollAnimation = () => {
        if (elementInView(footer)) {
            footer.classList.add("footer-animate");
        }
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Initial check
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 28,
    centeredSlides: false,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: false,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 28,
            centeredSlides: false,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 32,
        },
    },
});

gsap.registerPlugin(ScrollToPlugin);

let lastScrollTop = 0;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        // Determine scroll direction
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingUp = currentScrollTop < lastScrollTop;

        // Store the new scroll position
        lastScrollTop = currentScrollTop;

        // GSAP scrollTo with slower duration
        gsap.to(window, {
            scrollTo: {
                y: target,
                offsetY: 70 // Adjust this value based on your fixed header height
            },
            duration: isScrollingUp ? 2 : 1.5, // Duration of the scroll in seconds, longer when scrolling up
            ease: isScrollingUp ? "power3.inOut" : "power3.out" // Easing function for smoother scroll
        });
    });
});

const button = document.getElementById('stickyButton');

window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > 100) { // Show the button after scrolling 100px
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
    
    lastScrollTop = currentScrollTop;
});

// Scroll to top functionality
button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to clear the fragment identifier from the URL
    function clearHash() {
        if (window.location.hash) {
            const baseUrl = window.location.href.split('#')[0];
            window.history.replaceState(null, null, baseUrl);
        }
    }

    // Get the current hash value without the '#' symbol
    const hash = window.location.hash.substring(1);

    // List of valid section IDs to scroll to
    const validSections = ['home', 'about', 'services', 'testimonials'];

    // Check if the hash is a valid section ID
    if (validSections.includes(hash)) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        console.log("Invalid hash value:", hash);
    }

    // Clear the hash from the URL
    clearHash();
});
