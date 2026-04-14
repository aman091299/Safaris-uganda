// Force start from top and hide scroll
$(document).ready(function () {
  // Prevent scroll temporarily
  $("html, body").css({
    overflow: "hidden",
    height: "100vh",
  });
  // Start at top
  $(window).scrollTop(0);
});

// header scroll class
$(window).on("scroll", function () {
  var elementTop = $(".relative-part").offset().top;
  var scrollTop = $(window).scrollTop();

  if (scrollTop >= elementTop) {
    $("header.header").addClass("reached-top");
  } else {
    $("header.header").removeClass("reached-top");
  }
});

// Loader animation on window load
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader1").fadeOut(0, function () {
      $(".loader-bars").fadeIn(0);
    });
  }, 2000);

  setTimeout(function () {
    $(".loader-main").fadeOut(0, function () {
      // Restore scroll after loader finishes
      $("html, body").css({
        overflow: "auto",
        height: "auto",
      });
    });
  }, 4000);
});

// smooth scroll
// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);
//   window.scrollTo(0, 0);

//   const lenis = new Lenis({
//     duration: 2,
//     easing: (t) => {
//       return t === 1 ? 1 : 1 - Math.pow(2, -8 * t);
//     },
//     orientation: "vertical",
//     gestureOrientation: "vertical",
//     smoothWheel: true,
//     smoothTouch: false,
//     wheelMultiplier: 1.2,
//     touchMultiplier: 1.5,
//     infinite: false,
//     autoResize: true,
//     lerp: 0.06,
//   });

//   lenis.on("scroll", ScrollTrigger.update);

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);

//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
//   });

//   gsap.ticker.lagSmoothing(0);

//   setTimeout(() => {
//     ScrollTrigger.refresh(true);
//   }, 100);

//   window.addEventListener("resize", () => {
//     lenis.resize();
//     ScrollTrigger.refresh();
//   });

//   document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//       const target = this.getAttribute("href");
//       if (target.startsWith("#") && document.querySelector(target)) {
//         e.preventDefault();
//         lenis.scrollTo(target, {
//           offset: -80,
//           duration: 2.5,
//           easing: (t) => {
//             return t < 0.5
//               ? 0.5 * Math.pow(2, 20 * t - 10)
//               : 1 - 0.5 * Math.pow(2, -20 * t + 10);
//           },
//         });
//       }
//     });
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.2,
    touchMultiplier: 1.5,
    lerp: 0.08,
  });

  // Sync Lenis scroll with ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // GSAP drives Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Refresh after layout is ready
  ScrollTrigger.refresh();

  // Resize fix
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  // Anchor smooth scroll
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = this.getAttribute("href");
      if (target.startsWith("#") && document.querySelector(target)) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });
});

// bouncing balls
const colors = [
  "#19a106",
  "#39fb0d",
  "#3c8d0d",
  "#276b18",
  "#3eb981",
  "#68ef68",
  "#99f95e",
];
const numberOfBalls = 30;
const container = document.querySelector(".bouncing-balls-bg");

for (let i = 0; i < numberOfBalls; i++) {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  const isMobile = window.innerWidth < 768; // adjust breakpoint if needed
  const size = isMobile
    ? gsap.utils.random(1, 40) // smaller balls on mobile
    : gsap.utils.random(1, 80); // original size on deskto
  ball.style.width = size + "px";
  ball.style.height = size + "px";
  ball.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = gsap.utils.random(0, window.innerWidth) + "px";
  ball.style.top = gsap.utils.random(0, window.innerHeight) + "px";
  container.appendChild(ball);

  // Animate each ball with random path
  gsap.to(ball, {
    duration: gsap.utils.random(4, 8),
    x: gsap.utils.random(-200, 200),
    y: gsap.utils.random(-200, 200),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: gsap.utils.random(0, 2),
  });
}

// Refresh on resize
window.addEventListener("resize", () => {
  document.body.style.height = scrollContainer.scrollHeight + "px";
});

// banner slider
$(document).ready(function () {
  $(".bnner-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    dots: false,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
  });
});

// desti slider
$(document).ready(function () {
  $(".desti-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 800,
    dots: true,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
  });
});
// banner zoom on scroll
$(window).on("scroll", function () {
  // Amount the page has scrolled
  var scrollTop = $(window).scrollTop();

  // Maximum zoom factor
  var maxScale = 1.5;

  // Choose how much scroll range triggers full zoom
  var triggerHeight = 500; // adjust to taste

  // Calculate progress (0 → 1)
  var progress = Math.min(scrollTop / triggerHeight, 1);

  // Smooth scale from 1 → maxScale
  var scaleValue = 1 + progress * (maxScale - 1);

  // Apply to banner images
  $(".bnr-slide img").css("transform", "scale(" + scaleValue + ")");
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(".bg-img img", {
  scale: 1.5, // how much it zooms
  ease: "none",
  scrollTrigger: {
    trigger: ".inner-banner",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
// counter js

$(function () {
  let done = false;

  function go() {
    if (done) return;
    if (
      $(window).scrollTop() + $(window).height() >
      $(".counter").first().offset().top
    ) {
      done = true;

      $(".counter").each(function () {
        let $n = $(this).find(".num"),
          t = +$(this).data("target");

        $({ c: 0 }).animate(
          { c: t },
          {
            duration: 2000,
            easing: "swing",
            step: (n) => $n.text(Math.floor(n)),
            complete: () => {
              if (t >= 1000) $n.text(t / 1000 + "k");
              else $n.text(t);
            },
          },
        );
      });

      $(window).off("scroll", go);
    }
  }

  $(window).on("scroll load", go);
});

// animated text
gsap.registerPlugin(ScrollTrigger);

const text = document.querySelector(".animated-text");
const words = text.innerText.split(" ");

// Wrap each word in span
text.innerHTML = words.map((word) => `<span>${word}&nbsp;</span>`).join("");

const wordSpans = text.querySelectorAll("span");

// Animate color based on scroll position
gsap.to(wordSpans, {
  color: "#000000",
  stagger: {
    each: 0.1,
  },
  ease: "none",
  scrollTrigger: {
    trigger: text,
    start: "top 85%",
    end: "bottom 30%",
    scrub: true, // 👈 THIS makes it follow scroll both directions
  },
});

// progres slider
$(document).ready(function () {
  var $slider = $(".ex-slider");
  var $progress = $(".progress-fill");

  $slider.on("init reInit afterChange", function (event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    var total = slick.slideCount;

    var percent = (i / total) * 100;
    $progress.css("width", percent + "%");

    // Update slide number text
    $(".ex-slide-nm p").html(i + " <span>/" + total + "</span>");
  });

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $(".prev"),
    nextArrow: $(".next"),
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: false,
  });
});

// loader text animation
gsap.fromTo(
  ".loadr-txt",
  { y: 0 },
  {
    y: -15,
    duration: 0.8,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  },
);

//  footer slider
$(".foot-slider").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 0, // IMPORTANT for continuous
  speed: 6000, // controls smoothness
  cssEase: "linear", // IMPORTANT for continuous motion
  arrows: false,
  dots: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  draggable: false,
  swipe: false,
  touchMove: false,
  adaptiveHeight: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        arrows: false,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        arrows: false,
      },
    },
  ],
});

// clients slider
$(document).ready(function () {
  // CONTENT SLIDER
  $(".client-slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // we use custom buttons
    fade: true,
    asNavFor: ".client-slider-nav",
  });

  // IMAGE NAV SLIDER
  $(".client-slider-nav").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".client-slider-for",
    focusOnSelect: true,
    arrows: false,
    centerMode: false,
  });

  // CUSTOM BUTTONS
  $(".prev2").on("click", function () {
    $(".client-slider-for").slick("slickPrev");
  });

  $(".next2").on("click", function () {
    $(".client-slider-for").slick("slickNext");
  });
});

// sf-slider
$(".sf-slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,

  prevArrow: `<button type="button" class="slick-prev custom-arrow">
                 <i class="fa-solid fa-arrow-left"></i>
              </button>`,

  nextArrow: `<button type="button" class="slick-next custom-arrow">
                <i class="fa-solid fa-arrow-right"></i>
              </button>`,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
});

// e-bbok slider
$(document).ready(function () {
  $(".e-book-slider-wrap").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    centerPadding: "350px",
  });
});

// guest slider guest-slider
$(document).ready(function () {
  $(".guest-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

// choose slider  choose-slider
$(document).ready(function () {
  $(".choose-slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: false,
    arrows: true,
    prevArrow: $(".prev3"),
    nextArrow: $(".next3"),
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

// big images profile animation
$(window).on("scroll", function () {
  $(".b-img img").each(function () {
    if ($(this).hasClass("rotate")) return;

    var imgTop = $(this).offset().top;
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scrollTop + windowHeight > imgTop + 100) {
      $(this).addClass("rotate");
    }
  });
});

// tiles animation images

$(document).ready(function () {
  $(".mosaic-reveal").each(function () {
    const imgUrl = $(this).data("img");

    for (let i = 0; i < 9; i++) {
      const piece = $('<div class="mosaic-piece"></div>');
      piece.css("background-image", `url(${imgUrl})`);

      // Position background for each tile
      const x = (i % 3) * 50;
      const y = Math.floor(i / 3) * 50;
      piece.css("background-position", `${x}% ${y}%`);

      $(this).append(piece);
    }
  });
});
$(window).on("load", function () {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(entry.target)
            .find(".mosaic-piece")
            .each(function (i) {
              setTimeout(() => {
                $(this).addClass("show");
              }, i * 120);
            });
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 },
  );

  $(".mosaic-reveal").each(function () {
    observer.observe(this);
  });
});

// main tiger animation gsap

// Create a matchMedia instance
const mm = gsap.matchMedia();

mm.add("(min-width: 1600px)", () => {
  let TigerClaw = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-tiger",
      start: "top top",
      end: "+=500%",
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
    },
  });

  TigerClaw.to(
    ".tiger-claw-img",
    {
      scale: 5,
      y: -500,
      ease: "none",
      duration: 5,
      opacity: 0,
    },
    0,
  );

  TigerClaw.fromTo(
    ".tiger-overlay",
    { opacity: 0 },
    { opacity: 1, duration: 2 },
    1,
  );

  TigerClaw.from(
    ".tiger--cntnt",
    {
      y: 400,
      opacity: 0,
      duration: 2,
    },
    2,
  );

  TigerClaw.to({}, { duration: 2 });
});

// Create a matchMedia instance
const mx = gsap.matchMedia();

mx.add("(max-width: 1599px)", () => {
  let TigerClaw = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-tiger",
      start: "top top",
      end: "+=500%",
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
    },
  });

  TigerClaw.to(
    ".tiger-claw-img",
    {
      scale: 5,
      y: -500,
      ease: "none",
      duration: 5,
      opacity: 0,
    },
    0,
  );

  TigerClaw.fromTo(
    ".tiger-overlay",
    { opacity: 0 },
    { opacity: 1, duration: 2 },
    1,
  );

  TigerClaw.from(
    ".tiger--cntnt",
    {
      y: 400,
      opacity: 0,
      duration: 2,
    },
    2,
  );

  TigerClaw.to({}, { duration: 2 });
});

const mx2 = gsap.matchMedia();

mx2.add("(max-width: 991px)", () => {
  let TigerClaw = gsap.timeline({
    scrollTrigger: {
      start: "top top",
      end: "+=300%",
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
    },
  });
});
const mx3 = gsap.matchMedia();

mx3.add("(max-width: 991px)", () => {
  let TigerClaw = gsap.timeline({
    scrollTrigger: {
      start: "top top",
      end: "+=300%",
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
    },
  });

  TigerClaw.from(
    ".tiger-claw-img",
    {
      scale: 0.1,
      y: -500,
      ease: "none",
      duration: 5,
      opacity: 0,
    },
    0,
  );
});

// header js
// Toggle when hamburger is clicked
$(".navbar-toggler").on("click", function () {
  $(".navbar-collapse").toggleClass("show");
});

// Close when cross icon is clicked
$(".cross-icon").on("click", function () {
  $(".navbar-collapse").removeClass("show");
});

// header
$(document).ready(function () {
  $(".dropdwn-toggle > .nav-link").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(".dropdown-wrap").toggleClass("active");

    // If opening for first time, refresh visible slider
    if ($(".dropdown-wrap").hasClass("active")) {
      setTimeout(function () {
        $(".desti-details.active .desti-slider").slick("setPosition");
      }, 50); // small delay so layout becomes visible
    }
  });
  $(document).ready(function () {
    $(".desti-details").removeClass("active").hide();
    $("#Uganda").addClass("active").show();
    $('.desti-tab[href="#Uganda"]').addClass("active");
  });

  // Close when clicking the close button
  $(".close-btn").on("click", function (e) {
    e.stopPropagation();
    $(".dropdown-wrap").removeClass("active");
  });

  // Prevent closing when clicking inside dropdown
  $(".dropdown-wrap").on("click", function (e) {
    e.stopPropagation();
  });

  // Close when clicking anywhere outside
  $(document).on("click", function () {
    $(".dropdown-wrap").removeClass("active");
  });
});
$(document).ready(function () {
  // Hide all destination detail panels except Uganda on load
  $(".desti-details").hide();
  $("#Uganda").show();
  $('.desti-tab[href="#Uganda"]').addClass("active");

  // Tab click
  $(".desti-tab").on("click", function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    $(".desti-tab").removeClass("active");
    $(this).addClass("active");

    $(".desti-details").removeClass("active").hide();
    $(target).addClass("active").show();

    // 🔥 IMPORTANT: Refresh slick after showing
    $(target).find(".desti-slider").slick("setPosition");
  });
  $(window).on("load", function () {
    $("#Uganda").show().addClass("active");
    $("#Uganda").find(".desti-slider").slick("setPosition");
  });

  // Close button hides right panel (optional)
  $(".close-btn").on("click", function () {
    $(".desti-details").fadeOut(200);
    $(".desti-tab").removeClass("active");
  });
});
