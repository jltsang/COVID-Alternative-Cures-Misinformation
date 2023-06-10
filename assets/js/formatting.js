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

fixCodeblockIndents();
formatInlineCode();

