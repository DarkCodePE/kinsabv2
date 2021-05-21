/* ========== Scroll active Nav Style ========== */
// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;
  
    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
      
      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) { 
        cancelAnimationFrame(frame);
      }
  
      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {
        
        // Call our function and pass any params we received
        fn(...params);
      });
  
    } 
  };
  
  
  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
  }
  
  // Listen for new scroll events, here we debounce our `storeScroll` function
  document.addEventListener('scroll', debounce(storeScroll), { passive: true });
  
  // Update scroll position for first time
  storeScroll();

/* ========== Scroll active item ========== */

  // Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  
  // Get current scroll position
  let scrollY = window.pageYOffset;
  
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");
    /* console.log(sectionId); */
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
   const menuItem = document.querySelector("#menu li a[href*=" + sectionId + "]");
   /* console.log(menuItem) */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
        menuItem.classList.add("active");
        console.log(menuItem)
    } else {
        if(menuItem.classList.contains("active")){
            menuItem.classList.remove("active");
        }
    }
  });
}