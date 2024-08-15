// List of post files
const posts = [
    'remote-work.markdown',
    'clarity.markdown',
    'talent.markdown',
    'power-of-facilitation.markdown',
    'open-communication.markdown',
    'conscious-leadership.markdown',
    'creativity-at-work.markdown',

];

// Function to load the content of a Markdown file and display it in the overlay
function loadMarkdownFile(file) {
    fetch(file)
        .then(response => response.text())
        .then(text => {
            // Split front matter from the content
            const content = text.split('---')[2];
            document.getElementById('overlay-content').innerHTML = marked.parse(content);
            document.getElementById('overlay').classList.remove('hidden1');
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

                // Create a container div for the image and title
                const titleContainer = document.createElement('div');
                titleContainer.classList.add('flex', 'items-center', 'py-2', 'cursor-pointer');

                // Create the image element
                const imgElement = document.createElement('img');
                imgElement.src = 'assets/arrow-right.svg'; // Update with the correct path
                imgElement.alt = 'Arrow Right';
                imgElement.classList.add('w-6', 'h-6', 'mr-2');

                // Create the title element as a link
                const titleElement = document.createElement('a');
                titleElement.textContent = title;
                titleElement.classList.add('underline', 'block');

                // Set the onclick event for the title element
                titleElement.onclick = () => loadMarkdownFile(file);

                // Append the image and title to the container
                titleContainer.appendChild(imgElement);
                titleContainer.appendChild(titleElement);

                // Append the container to the titles container
                titlesContainer.appendChild(titleContainer);
            });
    });
}


// Close overlay functionality
document.getElementById('close-overlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('hidden1');
});

// Initial load of titles
loadTitles();
