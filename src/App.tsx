import "./App.css";
import {  PageContent } from "./components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// ScrollTrigger.defaults({
//   markers:true
// })

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
  <PageContent/>
  );
}

export default App;