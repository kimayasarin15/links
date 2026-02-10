

// Another test to try out JS 
let highlightClass = 'highlight'
let text = document.querySelector('h1')
let clickButton = document.querySelector('#click')

clickButton.addEventListener('click', () => {
    text.classList.toggle(highlightClass)
})




// I copied this from the class website and updated to match my variables
// I know we didn't go over it in classtime but I was reading the js page and wanted to experiement 
// I altered the opacity to change as you scroll I'm not sure I want to do this yet but I wanted to try it out to practice JS

let highlightScroll = 'scrollhighlight'
let blockScroll = document.querySelectorAll('ul')


blockScroll.forEach((block) => {
let sectionObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        block.classList.add(highlightScroll)
    } else {
        block.classList.remove(highlightScroll)
    }
}, {
    rootMargin: '-25% 0% -25% 0%',
})
sectionObserver.observe(block)
})


// Trying out using modal from the class example 
// This works for my first button but I need to make it work for all - tried with loops but wasn't working will come back to this


// let modalButton = document.querySelector('#modal')
// let modalDialog = document.querySelector('#dialog')
// let closeButton = modalDialog.querySelector('button')



// modalButton.addEventListener('click', () => {
//     modalDialog.showModal()
// })


// closeButton.addEventListener('click', () => {
//     modalDialog.close()
// })


// document.addEventListener('click', (event) => {
//     if(event.target == document.documentElement) {
//         modalDialog.close()
//     }
// })


