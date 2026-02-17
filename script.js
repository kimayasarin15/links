

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

// let highlightScroll = 'scrollhighlight'
// let blockScroll = document.querySelectorAll('ul')


// blockScroll.forEach((block) => {
// let sectionObserver = new IntersectionObserver(([entry]) => {
//     if (entry.isIntersecting) {
//         block.classList.add(highlightScroll)
//     } else {
//         block.classList.remove(highlightScroll)
//     }
// }, {
//     rootMargin: '-25% 0% -25% 0%',
// })
// sectionObserver.observe(block)
// })



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


// I used the help of Claude to get my text modals to work, which follows a simialr structure to the one I did above but allows it to work for all

// this is searching within my channel blocks
document.querySelector('#channel-blocks').addEventListener('click', (event) => {
    
    // this is saying if the class list contains a modal-button, find the dialog inside the li element and show the modal on click
    if (event.target.classList.contains('modal-button')) {
        let dialog = event.target.closest('li').querySelector('dialog');
        dialog.showModal();
    }

    // this is saying if the class list contains a close-button, find the closest dialog element and close it
    if (event.target.classList.contains('close-button')) {
        let dialog = event.target.closest('dialog');
        dialog.close();
    }
});

// this is saying if the user clicks outside the dialog button the modal should close
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'DIALOG') {
        event.target.close();
    }
});



