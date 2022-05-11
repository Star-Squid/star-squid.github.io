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
