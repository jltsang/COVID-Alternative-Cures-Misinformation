window.mobileCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

function fixCodeblockIndents() {
	// Get all code blocks in the HTML
	const codeBlocks = document.querySelectorAll('code');

	// Iterate through each code block
	codeBlocks.forEach((block) => {
		// Get the content of the code block
		let content = block.innerHTML;

		// Remove leading and trailing whitespace
		content = content.trim();

		// Find the minimum number of tabs in a line
		const tabsMatch = content.match(/^\t+/gm);
		const tabsCount = tabsMatch ? tabsMatch.reduce((min, tabs) => Math.min(min, tabs.length), Infinity) : 0;

		// Remove tabs from each line until one line has no more tabs
		content = content.replace(new RegExp(`^\t{${tabsCount}}`, 'gm'), '');

		// Update the content of the code block
		block.innerHTML = content;
	});
}

function formatInlineCode () {
	// Get all <p> elements
	const paragraphs = Array.from(document.getElementsByTagName('p'));

	// Loop through each <p> element
	paragraphs.forEach((paragraph) => {
		const paragraphText = paragraph.innerHTML;

		// Check if the paragraph text contains one or three backticks
		if (paragraphText.includes('`')) {
			// Regular expression to match text inside backticks
			const regex = /(`{1,3})(.*?)\1/g;

			// Replace matched text with wrapped <span> element
			const replacedText = paragraphText.replace(regex, '<span class="emph">$2</span>');

			// Update the paragraph with the modified text
			paragraph.innerHTML = replacedText;
		}
	});
}

// From https://www.w3schools.com/howto/howto_css_modal_images.asp
function createModal(modalName) {
	// Create the modal
	let modal = document.createElement("div");
	modal.id = `${modalName}-modal`;
	modal.classList.add("modal");

	let modalClose = document.createElement("span");
	modalClose.innerText = "×";
	modalClose.id = `${modalName}-close`;
	modalClose.classList.add("modal-close");
	modal.appendChild(modalClose);

	let img = document.getElementById(`${modalName}-img`);
	let modalImg = document.createElement("img");
	modalImg.id = `${modalName}-modal-img`;
	modalImg.classList.add("modal-image", "zoomable")
	modal.appendChild(modalImg);


	let modalCaption = document.createElement("div");
	modalCaption.id = `${modalName}-modal-caption`;
	modalCaption.classList.add("modal-caption");
	modal.appendChild(modalCaption);

	let nav = document.getElementsByTagName("nav")[0];
	let body = document.body;

	img.onclick = function() {
		modal.style.display = "block";
		nav.style.display = "none";
		modalImg.src = this.src;
		modalCaption.innerHTML = this.alt;
		body.style.overflow = "hidden";
	}

	// When the user clicks on <span> (x), close the modal
	modalClose.onclick = function() {
		modal.style.display = "none";
		nav.style.display = "block";
		body.style.overflow = "auto";
	}

	// Disable anchor to use modal instead
	let anchor = document.getElementById(`${modalName}-anchor`);
	anchor.removeAttribute("href");

	return modal;
}

function createModals() {
	let modalAnchors = document.querySelectorAll(".modal-anchor");

	modalAnchors.forEach(function(modalAnchor) {
		// Get modal name
		let modalName = modalAnchor.id.replace("-anchor", "");
		
		// Create modal
		let modal = createModal(modalName);

		// Add modal to DOM
		modalAnchor.insertAdjacentElement("afterend", modal);
	})
}

function implementZoom() {
	let zoomableElements = document.querySelectorAll(".zoomable");

	zoomableElements.forEach(function(el) {
		if (window.mobileCheck()) {
			el.classList.remove("zoomable");
		} else {
			el.onclick = function(event) {
				if (el.classList.contains("zoomed")) {
					el.classList.remove("zoomed");
				} else {
					let clickX = event.offsetX / el.offsetWidth;
					let clickY = event.offsetY / el.offsetHeight;
		
					el.style.transformOrigin = clickX * 100 + "% " + clickY * 100 + "%";
					el.classList.add("zoomed");
				}
			}
		}
	})
}


console.log(window.mobileCheck());
fixCodeblockIndents();
formatInlineCode();
if (!window.mobileCheck()) {
	createModals();
}
implementZoom();