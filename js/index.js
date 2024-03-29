//  SCROLL ANIMATIONS

const reveal = document.querySelectorAll(".reveal");
const rightSlide = document.querySelectorAll(".right-slide");

const options = {
  root: null, //viewport
  threshold: 0,
  // rootMargin: "-150px",
};

//Fade in while scrolling
const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    // console.log(entry.target.classList);
    entry.target.classList.add("activate");
    observer.unobserve(entry.target);
  });
}, options);

reveal.forEach((section) => observer.observe(section));

//Slide elements from right
const slideObserver = new IntersectionObserver(function (
  entries,
  slideObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("right-slide-activate");
    observer.unobserve(entry.target);
  });
});

rightSlide.forEach((section) => slideObserver.observe(section));

// MODALS AND FOCUS

let focusedElementBeforeModal;
let imgThatWasClicked;

const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
let modalImage = document.querySelector("#modal-img");

const modalToggles = document.querySelectorAll(".modal-toggle");

modalToggles.forEach((toggle) => toggle.addEventListener("click", openModal))

function openModal() {
  // Save current focus
  focusedElementBeforeModal = document.activeElement;

  //Save current image clicked, display it in the modal
  imgThatWasClicked = this.children[0].children[0].classList[1];
  modalImage.src = "thumbs/" + imgThatWasClicked + ".webp";

  // Listen for and trap the keyboard
  modal.addEventListener("keydown", trapTabKey);

  // Listen for indicators to close the modal
  modalOverlay.addEventListener("click", closeModal);

  // Modal close buttons
  const closeButtons = modal.querySelectorAll(".modal-close");

  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  // Find all focusable children
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = modal.querySelectorAll(focusableElementsString);

  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  // Show the modal and overlay
  modal.style.display = "block";
  modalOverlay.style.display = "block";

  // animation
  setTimeout(function () {
    modal.classList.remove("modal-closed");
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

//Close the modal
function closeModal() {
  // animate
  modal.classList.add("modal-closed");

  setTimeout(function () {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
  }, 300);

  // set focus back to before the modal was opened
  focusedElementBeforeModal.focus();
}
