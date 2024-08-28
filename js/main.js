// List of posts with corresponding slugs
const posts = [
    { file: 'remote-work.markdown', slug: 'remote-work' },
    { file: 'clarity.markdown', slug: 'clarity' },
    { file: 'talent.markdown', slug: 'talent' },
    { file: 'power-of-facilitation.markdown', slug: 'power-of-facilitation' },
    { file: 'open-communication.markdown', slug: 'open-communication' },
    { file: 'conscious-leadership.markdown', slug: 'conscious-leadership' },
    { file: 'creativity-at-work.markdown', slug: 'creativity-at-work' },
];

// Function to load the content of a Markdown file and display it in the overlay
function loadMarkdownFile(slug) {
    const post = posts.find(p => p.slug === slug);
    if (!post) return;

    fetch(post.file)
        .then(response => response.text())
        .then(text => {
            const content = text.split('---')[2];
            document.getElementById('overlay-content').innerHTML = marked.parse(content);
            document.getElementById('overlay').classList.remove('hidden1');
            // Update the URL without reloading the page
            window.history.pushState({ slug }, '', `#${slug}`);
        });
}

// Function to handle back/forward navigation and initial load
window.onpopstate = function(event) {
    const slug = window.location.hash.substring(1);
    if (slug) {
        loadMarkdownFile(slug);
    } else {
        // Close the overlay if there's no slug in the URL
        document.getElementById('overlay').classList.add('hidden1');
    }
};

// Function to load the titles and set up the links with correct slugs
function loadTitles() {
    const titlesContainer = document.getElementById('titles');
    posts.forEach(post => {
        fetch(post.file)
            .then(response => response.text())
            .then(text => {
                const frontMatter = text.split('---')[1];
                const title = frontMatter.match(/title:\s*(.*)/)[1].trim();

                // Create the icon wrapper element
                const iconWrapper = document.createElement('span');
                iconWrapper.classList.add('icon-wrapper');

                // Create the first image element (the one that will move left on hover)
                const imgElement1 = document.createElement('img');
                imgElement1.src = 'assets/arrow-right.svg';
                imgElement1.alt = 'Arrow Right';
                imgElement1.classList.add('icon');



                // Add both images to the icon wrapper
                iconWrapper.appendChild(imgElement1);


                // Create the title element as a link
                const titleElement = document.createElement('a');
                titleElement.textContent = title;
                titleElement.classList.add('underline', 'block', 'link-text');

                // Create the container for the entire link
                const containerElement = document.createElement('a');
                containerElement.classList.add('arrow-link', 'flex', 'w-full', 'py-2');
                containerElement.href = `#${post.slug}`;

                // Append iconWrapper and titleElement to the container
                containerElement.appendChild(iconWrapper);
                containerElement.appendChild(titleElement);

                // Set the onclick event for the title element
                containerElement.onclick = (e) => {
                    e.preventDefault(); // Prevent default link behavior
                    loadMarkdownFile(post.slug);
                };

                // Append the container to the titles container
                titlesContainer.appendChild(containerElement);
            })
            .catch(error => console.error('Error loading post:', error));
    });
}

// Close overlay functionality
document.getElementById('close-overlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('hidden1');
    // Clear the URL hash
    window.history.pushState({}, '', window.location.pathname);
});

// Initial load of titles
loadTitles();

// Check if there's a slug in the URL on page load
const initialSlug = window.location.hash.substring(1);
if (initialSlug) {
    loadMarkdownFile(initialSlug);
}


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
