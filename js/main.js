const files = ['content/file1.md', 'content/file2.md'];

function loadMarkdownFile(file) {
    fetch(file)
        .then(response => response.text())
        .then(text => {
            document.getElementById('content').innerHTML = marked.parse(text);
        });
}

function loadTitles() {
    const titlesContainer = document.getElementById('titles');
    files.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(text => {
                // Extract title from the first line of the Markdown file (assuming it's a header)
                const title = text.split('\n')[0].replace(/^#\s*/, ''); // Removes the leading "# " from Markdown header
                const titleElement = document.createElement('h2');
                titleElement.textContent = title;
                titleElement.style.cursor = 'pointer';
                titleElement.onclick = () => loadMarkdownFile(file);
                titlesContainer.appendChild(titleElement);
            });
    });
}

// Initial load of titles
loadTitles();
