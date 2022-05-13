// var observer = new IntersectionObserver(function(entries) {
// 	// isIntersecting is true when element and viewport are overlapping
// 	// isIntersecting is false when element and viewport don't overlap
// 	if(entries[0].isIntersecting === true)
// 		console.log('Element has just become visible in screen');
// }, { threshold: [0] });

// observer.observe(document.querySelector("#my-element"));


// const reveal = document.querySelectorAll(".reveal")

// const callback = (entries, observer) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("activate")
//     }
//   })
// }
// const options = {}

// const myObserver = new IntersectionObserver(callback, options)
// myObserver.observe(reveal)

const about = document.querySelector("#about");
const projects = document.querySelector("#projects");
const contact = document.querySelector("#contact");
const reveal = document.querySelectorAll(".reveal");
const rightSlide = document.querySelectorAll(".right-slide")

const options = {
    root: null, //viewport
    threshold: 0,
    // rootMargin: "-150px",
};

//Fade elements in
const observer = new IntersectionObserver(function
    (entries, observer){
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                return;
            }
            // console.log(entry.target.classList);
            entry.target.classList.add("activate");
            observer.unobserve(entry.target);
    });
}, options);

reveal.forEach(section => observer.observe(section))
// observer.observe(projects);

//Slide elements from right right-slide-activate
const slideObserver = new IntersectionObserver(function
    (entries, slideObserver){
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                return;
            }
            entry.target.classList.add("right-slide-activate");
            observer.unobserve(entry.target);
        })
    })

    rightSlide.forEach(section => slideObserver.observe(section))

// 

// Adapted from https://github.com/udacity/ud891/tree/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution

// Will hold previously focused element
let focusedElementBeforeModal;

// Find the modal and its overlay
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');

// Attach listeners to all the modal toggles
const modalToggles = document.querySelectorAll('.modal-toggle');

for(let i = 0; i < modalToggles.length; i++) {
	modalToggles[i].addEventListener('click', openModal);
}

/**
 * Opens the modal and traps focus.
 */
function openModal() {
  // Save current focus
  focusedElementBeforeModal = document.activeElement;

  // Listen for and trap the keyboard
  modal.addEventListener('keydown', trapTabKey);

  // Listen for indicators to close the modal
  modalOverlay.addEventListener('click', closeModal);
	
  // Modal close buttons
  const closeButtons = modal.querySelectorAll('.modal-close');
	
	// Attach listeners to all the close modal buttons
	for(let i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', closeModal);
	}

  // Find all focusable children
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = modal.querySelectorAll(focusableElementsString);
	
  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  // Show the modal and overlay
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
	
	// This just allows for the animation, not required.
	setTimeout(function() {
		modal.classList.remove('modal-closed');
	}, 10);

  // Focus first child
  firstTabStop.focus();

  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {

      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

      // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      closeModal();
    }
  }
}

/**
 * Closes the modal.
 */
function closeModal() {
	
	// Animate the close
	modal.classList.add('modal-closed');
	
	// This setTimeout just allows for the animation, not required.
	setTimeout(function() {
		 // Hide the modal and overlay
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
	}, 300);
	

  // Set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
}