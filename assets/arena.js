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
    let channelSlug = document.querySelector('#channel-slug')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = channelData.title
	channelDescription.innerHTML = channelData.description.html
	// channelCount.innerHTML = channelData.counts.blocks
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
    channelSlug.innerHTML = channelData.slug
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
			<li class="align align1">
            <button class="modal-button">
                <picture>
                    <source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
                    <source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
                    <img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
                </picture>
            </button>

            <dialog class="modal-dialog">
                ${blockData.title ? `<h2>${blockData.title}</h2>` : ''}             
                <p><a href="${blockData.source.url}" target="_blank">visit link</a></p>
                <button class="close-button">Close</button>
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
            <figure>
                <picture class="image">
                    <source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
                    <source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
                    <img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
                </picture>
            </figure>
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
			<li class="align3"> 
				<button class="modal-button">${'read'}</button>
				<dialog class="modal-dialog">
					<h2>${blockData.title || 'Text Block'}</h2>
					<p class="modal-content">${blockData.content.html}</p>
					<button class="close-button">Close</button>
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
					<li class="align1">
						<button class="modal-button">
							<picture>
                    			<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
                    			<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
                    			<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
                			</picture>
						</button>
						<dialog class="modal-dialog">
							<h2>${blockData.title}</h2>
						<div class="videowrapper">
							<video controls src="${blockData.attachment.url}"></video>
						</div>
							<p class="description">${blockData.description ? blockData.description.html : ''}</p>
							<button class="close-button">Close</button>
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
        		<li class="align2">
				   <button class="modal-button">
						<picture>
							<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
							<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
							<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
						</picture>
                    </button>
					   <dialog class="modal-dialog">
                            <h2>${blockData.title}</h2>
						<iframe
							src="${ blockData.attachment.url }"
						></iframe>
					 <p class="description">${blockData.description ? blockData.description.html : ''} </p>
					<button class="close-button">Close</button>
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
                    <li class="align align3">
                        <button class="modal-button">
                            <picture>
								<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
								<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
								<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
							</picture>
                        </button>
                        <dialog class="modal-dialog">
                            <h2>${blockData.title}</h2>
                        <div class="audiowrapper">
                             <audio controls src="${ blockData.attachment.url }"></audio>
                        </div>
						<p class="description">${blockData.description ? blockData.description.html : ''}</p>
                        <button class="close-button">Close</button>
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
			// Claude helped me this this up to fit the format of my modals but I can't get the js to work. The model button shows the thumbnail image and the video title. When open it shows the title, emdeded content, description and close button. I wanted to use thumnail images for my videos as it was taking up too much space on the page.
			let linkedVideoItem = `
					<li class="align1">
						<button class="modal-button">
							<picture>
								<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
								<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
								<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
							</picture>
						</button>
						<dialog class="modal-dialog">
							<h2>${blockData.title}</h2>
							<div class="videowrapper">
								${blockData.embed.html}
							</div>
							<p class="description">${blockData.description ? blockData.description.html : ''}</p>
							<button class="close-button">Close</button>
						</dialog>
					</li>
				`			
				channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem);
			// More on `iframe`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embedType.includes('rich')) {
			// …up to you!
			let linkedAudioitem =
				`
				<li class="align2">
					${ blockData.embed.html }
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', linkedAudioitem)
			// I left my embdeds without modals as I like the look of the spotify tabs it feels on theme

		}
	}
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
})



