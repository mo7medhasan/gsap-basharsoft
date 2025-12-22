import { useEffect } from "react";
import "./App.css";
import {  PageContent } from "./components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// ScrollTrigger.defaults({
//   markers:true
// })

gsap.registerPlugin(ScrollTrigger);

function App() {

useEffect(() => {
  ScrollTrigger.getAll().forEach(st => {
    if (st.pin) st.disable(false);
  });

  gsap.to(window, {
    scrollTo: { y: 0 },
    duration: 1.5,
    ease: "power3.inOut",
    onComplete: () => {
      ScrollTrigger.getAll().forEach(st => st.enable());
      ScrollTrigger.refresh();
    },
  });
}, []);


  return (
  <PageContent/>
  );
}

export default App;