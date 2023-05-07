import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { DrawSVGPlugin } from "../libs/DrawSVGPlugin.js";

const allAnimations = document.querySelectorAll("[data-animate]");
gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

allAnimations.forEach((element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element.closest(".decor"),
      start: element.dataset.animate === "top" ? "top 150px" : "top 100%",
      end: "bottom -300px",
      scrub: 1,
    },
    markers: { startColor: "green", endColor: "red", fontSize: "12px" },
  });

  tl.fromTo(
    element,
    {
      stagger: 0.3,
      drawSVG: element.dataset.animate === "reverse" ? "0% 0%" : "100% 100%",
    },
    {
      duration: 100,
      drawSVG: element.dataset.animate === "reverse" ? "100% 0%" : "0% 100%",
    }
  );

  ScrollTrigger.create({
    trigger: element,
    start: element.dataset.animate === "top" ? "top 150px" : "top 90%",
    end: "bottom -300px",
    scrub: 1,
  });
});
