let channelSlug = 'girl-so-confusing-ft-lorde' // The “slug” is just the end of the URL.
let myUsername = 'kimaya-sarin' // For linking to your profile.



// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (channelData) => {
	// Target some elements in your HTML:
	let channelTitle = document.querySelector('#channel-title')
	let channelDescription = document.querySelector('#channel-description')
	// let channelCount = document.querySelector('#channel-count')
	// I was getting some console errors because I wasn't using this so I commented it out for now
	let channelLink = document.querySelector('#channel-link')
    let channelSlugNew = document.querySelector('#channel-slug')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = channelData.title
	channelDescription.innerHTML = channelData.description.html
	// channelCount.innerHTML = channelData.counts.blocks
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
    channelSlugNew.innerHTML = channelData.slug
}



// Then our big function for specific-block-type rendering:
let renderBlock = (blockData) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.querySelector('#channel-blocks')

	// Links!
	if (blockData.type == 'Link') {
		// Declares a “template literal” of the dynamic HTML we want.
		let linkItem =
			`
		<li class="align">
            <button class="modal-button">
                <picture>
                    <source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
                    <source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
                    <img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
                </picture>
            </button>
            <dialog class="modal-dialog">
				<section class="topbar">
					<h2 class="modal-title">${blockData.title}</h2> 
					<button class="close-button">✕</button>
				</section>
				<img src="${blockData.image.small.src_2x}" alt="${blockData.image.alt_text}">            
				<section class="modal-footer">
					<a class="visit-button" href="${blockData.source?.url}" target="_blank">visit link</a>
					<a class="arena-button" href="https://www.are.na/block/${blockData.id}" target="_blank">view on are.na</a>
				</section>
			</dialog>
        </li>

			`

		// And puts it into the page!
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)

		// More on template literals:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	}

	// Images!
	else if (blockData.type == 'Image') {
		let imageItem = 
        `
		<li class="hover align2">
			<button class="modal-button-image">
				<figure class="polaroid">
					<picture class="image">
						<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
						<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
						<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
					</picture>
				</figure>
			</button>
			<dialog class="modal-dialog-image">
				<figure class="polaroid">
					<picture class="image">
						<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
						<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
						<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
					</picture>
				</figure>
			</dialog>
		</li>
    `
        channelBlocks.insertAdjacentHTML('beforeend', imageItem)
		// I left the images as they are for now but I may add modals or some other interaction later
	}

	// Text!
	else if (blockData.type == 'Text') {
		// …up to you!
		// I used Claude to help me format my text in <dialog> elements. I had it like this in my orginal html. The || means if there is no block title display 'read more'
		
		let textItem = `
			<li> 
				<button class="modal-button read-button">${'read'}</button>
				<dialog class="modal-dialog">
				  	<section class="topbar">
						<h2 class="modal-title">${blockData.title || 'read'}</h2>
						<button class="close-button">✕</button>
                	</section>
					<p class="modal-content">${blockData.content.html}</p>
					<section class="modal-footer2">
                    	<a class="arena-button" href="https://www.are.na/block/${blockData.id}" target="_blank">view on are.na</a>
                	</section>
				</dialog>
			</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', textItem);

	}

	// Uploaded (not linked) media…
	else if (blockData.type == 'Attachment') {
		let contentType = blockData.attachment.content_type // Save us some repetition.

		// Uploaded videos!
		if (contentType.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
					<li>
						<button class="modal-button">
							<picture>
                    			<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
                    			<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
                    			<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
                			</picture>
						</button>
						<dialog class="modal-dialog">
							<section class="topbar">
								<h2 class="modal-title">${blockData.title}</h2>
								<button class="close-button">✕</button>
							</section>
							<div class="videowrapper">
								<video controls src="${blockData.attachment.url}"></video>
							</div>
							<section class="modal-footer2">
                    			<a class="arena-button" href="https://www.are.na/block/${blockData.id}" target="_blank">view on are.na</a>
                			</section>
						</dialog>
					</li>
				`			

			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

			// More on `video`, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (contentType.includes('pdf')) {
			// …up to you!
			let pdfItem =
				   `
        		<li>
				   <button class="modal-button">
						<picture>
							<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
							<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
							<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
						</picture>
                    </button>
					   <dialog class="modal-dialog">
                            <section class="topbar">
								<h2 class="modal-title">${blockData.title}</h2>
								<button class="close-button">✕</button>
							</section>
							<iframe
								src="${ blockData.attachment.url }">
							</iframe>
							<section class="modal-footer2">
                    			<a class="arena-button" href="https://www.are.na/block/${blockData.id}" target="_blank">view on are.na</a>
                			</section>
                    </dialog>

        		</li>
       			 `
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
		}

		// Uploaded audio!
		else if (contentType.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			  let audioItem =
                `
                    <li class="align">
                        <button class="modal-button">
                            <picture>
								<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
								<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
								<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
							</picture>
                        </button>
                        <dialog class="modal-dialog">
                            <section class="topbar">
								<h2 class="modal-title">${blockData.title}</h2>
								<button class="close-button">✕</button>
							</section>
                        	<div class="audiowrapper">
                            	<audio controls src="${ blockData.attachment.url }"></audio>
                        	</div>
                        	<section class="modal-footer2">
                    			<a class="arena-button" href="https://www.are.na/block/${blockData.id}" target="_blank">view on are.na</a>
                			</section>
                        </dialog>
                    </li>
                `           
                channelBlocks.insertAdjacentHTML('beforeend', audioItem)

			// More on`audio`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked (embedded) media…
	else if (blockData.type == 'Embed') {
		let embedType = blockData.embed.type


		// Linked video!
		if (embedType.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			// Got help from Michael on slack - this targets tiktok videos specifically. I was having issues styling them because of their hard coded embdeds. So I styled my tiktoks similarly to my links where you can view the live link but you just see the thumbnail. The other videos (mostly youtube) are shown how they were preivously with iframes that you can play
			    if (blockData.source.url.includes('tiktok.com')) {
				let tiktokItem = `
					<li class="align">
						<button class="modal-button">
							<picture>
								<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
								<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
								<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
							</picture>
						</button>
						<dialog class="modal-dialog">
							<section class="topbar">
								<h2 class="modal-title">${blockData.title}</h2> 
								<button class="close-button">✕</button>
							</section>
							<img src="${blockData.image.small.src_2x}" alt="${blockData.image.alt_text}">            
							<section class="modal-footer">
								<a class="visit-button" href="${blockData.source?.url}" target="_blank">visit link</a>
								<a class="arena-button" href="https://www.are.na/block/${blockData.id}" target="_blank">view on are.na</a>
							</section>
						</dialog>
					</li>
				`
				channelBlocks.insertAdjacentHTML('beforeend', tiktokItem)
			
			} else {
				let linkedVideoItem = `
					<li>
						<button class="modal-button">
							<picture>
								<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
								<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
								<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
							</picture>
						</button>
						<dialog class="modal-dialog">
							<section class="topbar">
								<h2 class="modal-title">${blockData.title}</h2>
								<button class="close-button">✕</button>
							</section>
							<div class="videowrapper">
								${blockData.embed.html}
							</div>
							<section class="modal-footer2">
								<a class="arena-button" href="https://www.are.na/block/${blockData.id}" target="_blank">view on are.na</a>
							</section>
						</dialog>
					</li>
				`
				channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			}
			// More on `iframe`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embedType.includes('rich')) {
			// …up to you!
			let linkedAudioitem =
				`
				<li>
					<div class="embed-wrapper">
						${ blockData.embed.html }
					</div>
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', linkedAudioitem)
			// I left my embdeds without modals as I like the look of the spotify tabs it feels on theme

		}
	}
	// I used Claude to help me with randomly rotating all my blocks using math.random to help make it feel more chaotic as before I had manually done it
	// this selects all the li elements
	let blocks = document.querySelectorAll('#channel-blocks li')
	// this selects the 'last block' which is the most recently added block everytime it renders the block
  	let lastBlock = blocks[blocks.length - 1]
	// this gives it a random rotation: math random picks a decimal from 0 and 1, it is then multiplied by 360 to give it an angle value, then math floor rounds it down
	// so if it picks 0.5, it will rotate 180deg 
  	lastBlock.style.setProperty('--random-rotate', `${Math.floor(Math.random() * 360)}deg`)

}



// A function to display the owner/collaborator info:
let renderUser = (userData) => {
	let channelUsers = document.querySelector('#channel-users') // Container.

	let userAddress =
		`
		<address>
		     <!-- <img src="${ userData.avatar }"> -->
			<h3>${ userData.name }</h3>
			<p><a href="https://are.na/${ userData.slug }">Are.na profile</a></p>
		</address>
		`

	channelUsers.insertAdjacentHTML('beforeend', userAddress)
}


// Finally, a helper function to fetch data from the API, then run a callback function with it:


let fetchJson = (url, callback, pageResponses = []) => {
	fetch(url, { cache: 'no-store' })
		.then((response) => response.json())
		.then((json) => {
			// Add this page to our temporary “accumulator” list parameter (an array).
			pageResponses.push(json)

			// Are.na response includes this “there are more!” flag (a boolean):
			if (json.meta && json.meta.has_more_pages) { // If that exists and is `true`, keep going…
				// Fetch *another* page worth, passing along our previous/accumulated responses.
				fetchJson(`${url}&page=${pageResponses.length + 1}`, callback, pageResponses)
			} else { // If it is `false`, there are no more pages…
				// “Flattens” them all together as if they were one page response.
				json.data = pageResponses.flatMap((page) => page.data)

				// Return the data to the callback!
				callback(json)
			}
	})
}

// More on `fetch`:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch


// Now that we have said all the things we *can* do, go get the channel data:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}`, (json) => {
	console.log(json) // Always good to check your response!

	placeChannelInfo(json) // Pass all the data to the first function, above.
	renderUser(json.owner) // Pass just the nested object `.owner`.
})

// Get your info to put with the owner's:
fetchJson(`https://api.are.na/v3/users/${myUsername}/`, (json) => {
	console.log(json) // See what we get back.

	renderUser(json) // Pass this to the same function, no nesting.
})

// And the data for the blocks:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`, (json) => {
	console.log(json) // See what we get back.

	// Loop through the nested `.data` array (list).
	json.data.forEach((blockData) => {
		// console.log(blockData) // The data for a single block.

		renderBlock(blockData) // Pass the single block’s data to the render function.
		})
		
		// this has to go here so it can work after all the blocks have been rendered
		document.querySelectorAll('#channel-blocks li').forEach((block) => {
			let sectionObserver = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					block.classList.add('scrollhighlight')
				} else {
					block.classList.remove('scrollhighlight')
				}
			}, {
				rootMargin: '-25% 0% -25% 0%',
			})
			sectionObserver.observe(block)
		})
})



