
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
let blockScroll = document.querySelectorAll('div')


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
