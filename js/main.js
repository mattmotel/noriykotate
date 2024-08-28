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

                // Extract title from front matter
                const title = frontMatter.match(/title:\s*(.*)/)[1].trim();

                // Create the icon wrapper element
                const iconWrapper = document.createElement('span');
                iconWrapper.classList.add('icon-wrapper');


                // Create the first image element (the one that will move left on hover)
                const imgElement1 = document.createElement('img');
                imgElement1.src = 'assets/arrow-right.svg'; // Update with the correct path
                imgElement1.alt = 'Arrow Right';
                imgElement1.classList.add('icon'); // Class for animation

                // Create the second image element (the one that will move in from the right on hover)
                const imgElement2 = document.createElement('img');
                imgElement2.src = 'assets/arrow-right.svg'; // Update with the correct path
                imgElement2.alt = 'Arrow Right';
                imgElement2.classList.add('icon'); // Class for animation

                // Add both images to the icon wrapper
                iconWrapper.appendChild(imgElement1);
                iconWrapper.appendChild(imgElement2);

                // Create the title element as a link
                const titleElement = document.createElement('a');
                titleElement.textContent = title;
                titleElement.classList.add('underline', 'block', 'link-text');

                // Create the container for the entire link
                const containerElement = document.createElement('a');
                containerElement.classList.add('arrow-link', 'flex', 'w-full', 'py-2');

                containerElement.href = "#"; // Add the correct link here

                // Append iconWrapper and titleElement to the container
                containerElement.appendChild(iconWrapper);
                containerElement.appendChild(titleElement);

                // Set the onclick event for the title element
                containerElement.onclick = () => loadMarkdownFile(file);

                // Append the container to the titles container
                titlesContainer.appendChild(containerElement);
            })
            .catch(error => console.error('Error loading post:', error));
    });
}



// Close overlay functionality
document.getElementById('close-overlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('hidden1');
});

// Initial load of titles
loadTitles();


window.addEventListener('scroll', function() {
    const stickyMenu = document.getElementById('sticky-menu');

    if (window.scrollY > window.innerHeight) {
        // Ensure the menu is visible and begins transitioning in
        if (stickyMenu.classList.contains('hidden')) {
            stickyMenu.classList.remove('hidden');
        }
        // Ensure opacity and transform are applied after the menu is visible
        setTimeout(() => {
            stickyMenu.classList.remove('opacity-0', '-translate-y-4');
            stickyMenu.classList.add('opacity-100', 'translate-y-0');
        }, 10); // Slight delay to ensure the browser renders the removal of 'hidden'
    } else {
        // Start hiding the menu
        stickyMenu.classList.add('opacity-0', '-translate-y-4');
        stickyMenu.classList.remove('opacity-100', 'translate-y-0');

        // Delay adding 'hidden' to ensure the transition completes
        setTimeout(() => {
            if (window.scrollY <= window.innerHeight) {
                stickyMenu.classList.add('hidden');
            }
        }, 500); // Match the duration of your transition
    }
});
