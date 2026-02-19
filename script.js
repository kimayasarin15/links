

// Another test to try out JS - not ussing this now 
// let highlightClass = 'highlight'
// let text = document.querySelector('h1')
// let clickButton = document.querySelector('#click')

// clickButton.addEventListener('click', () => {
//     text.classList.toggle(highlightClass)
// })


// this is for my channel blocks to switch between reveal and hide 
let reveal = document.querySelector('#revealbutton');
let hide = document.querySelector('#hidebutton');
let channelBlocks = document.querySelector('#channel-blocks');

reveal.addEventListener('click', () => {
    channelBlocks.classList.add('reveal');
});

hide.addEventListener('click', () => {
    channelBlocks.classList.remove('reveal');
});




// I copied this from the class website and updated to match my variables
// I know we didn't go over it in classtime but I was reading the js page and wanted to experiement 
// I altered the opacity to change as you scroll I'm not sure I want to do this yet but I wanted to try it out to practice JS

// let highlightScroll = '.scrollhighlight'
// let blockScroll = document.querySelectorAll('#channel-blocks')


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


// this is my modal js for my header button - I re wrote it because the one below was only looking in channel blocks and this was in my header but will look into seeing if theres a way to combine them

let modalButton = document.querySelector('.modal-button')
let modalDialog = document.querySelector('header dialog')
let closeButton = modalDialog.querySelector('.close-button')

modalButton.addEventListener('click', () => {
    modalDialog.showModal()
})

closeButton.addEventListener('click', () => {
    modalDialog.close()
})

document.addEventListener('click', (event) => {
    if(event.target.tagName === 'DIALOG') {
        event.target.close()
    }
})


// I used the help of Claude to get my text modals to work, which follows a simialr structure to the one I did above but allows it to work for all

// this is searching within my channel blocks
document.querySelector('#channel-blocks').addEventListener('click', (event) => {
    
    // changed this to .closest so it can select any clicks inside the modal button as it's not always an actual button
    if (event.target.closest('.modal-button')) {
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



