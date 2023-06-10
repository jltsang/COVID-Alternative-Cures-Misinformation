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


