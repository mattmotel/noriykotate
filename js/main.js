// List of post files
const posts = [
    '_posts/2024-08-15-test.markdown',
    '_posts/test2.markdown'
];
 
// Function to load the content of a Markdown file and display it in the overlay
function loadMarkdownFile(file) {
    fetch(file)
        .then(response => response.text())
        .then(text => {
            // Split front matter from the content
            const content = text.split('---')[2];
            document.getElementById('overlay-content').innerHTML = marked.parse(content);
            document.getElementById('overlay').classList.remove('hidden');
        });
}

// Function to load the titles and dates from the front matter
function loadTitles() {
    const titlesContainer = document.getElementById('titles');
    posts.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(text => {
                // Split the front matter
                const frontMatter = text.split('---')[1];

                // Extract title and date from front matter
                const title = frontMatter.match(/title:\s*(.*)/)[1].trim();

                // Create a title element
                const titleElement = document.createElement('h2');
                titleElement.textContent = title;
                titleElement.style.cursor = 'pointer';
                titleElement.onclick = () => loadMarkdownFile(file);
                titlesContainer.appendChild(titleElement);
            });
    });
}

// Close overlay functionality
document.getElementById('close-overlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('hidden');
});

// Initial load of titles
loadTitles();
