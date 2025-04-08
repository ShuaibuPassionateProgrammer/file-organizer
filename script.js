// Select DOM elements
const fileInput = document.getElementById('file-input');
const organizeBtn = document.getElementById('organize-btn');
const fileDisplay = document.getElementById('file-display');

// Store uploaded files to prevent duplicates
const uploadedFiles = new Map(); // Use Map to store file details (name and type)

// Event listener for the "Organize Files" button
organizeBtn.addEventListener('click', () => {
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select files to organize.');
        return;
    }

    // Organize files by type
    const organizedFiles = {};
    Array.from(files).forEach(file => {
        if (uploadedFiles.has(file.name)) {
            // Skip duplicate files
            return;
        }

        // Add file to the uploadedFiles map
        uploadedFiles.set(file.name, file.type);

        const fileType = file.type.split('/')[0] || 'unknown';
        if (!organizedFiles[fileType]) {
            organizedFiles[fileType] = [];
        }
        organizedFiles[fileType].push(file);
    });

    // Display organized files in a grid
    for (const [type, fileList] of Object.entries(organizedFiles)) {
        let section = document.querySelector(`.file-section[data-type="${type}"]`);

        // Create a new section if it doesn't exist
        if (!section) {
            section = document.createElement('div');
            section.classList.add('file-section');
            section.setAttribute('data-type', type);
            section.innerHTML = `<h3>${type.toUpperCase()}</h3>`;
            
            const grid = document.createElement('div');
            grid.classList.add('file-grid');
            section.appendChild(grid);
            fileDisplay.appendChild(section);
        }

        const grid = section.querySelector('.file-grid');

        // Add new files to the grid
        fileList.forEach(file => {
            const fileCard = document.createElement('div');
            fileCard.classList.add('file-card');
            fileCard.innerHTML = `
                <div class="file-icon">📄</div>
                <div class="file-name">${file.name}</div>
            `;
            grid.appendChild(fileCard);
        });
    }

    // Clear the file input to allow re-uploading the same file if needed
    fileInput.value = '';
});