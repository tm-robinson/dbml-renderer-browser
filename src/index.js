import { check, parse, run } from "@softwaretechnik/dbml-renderer";
import vizRenderStringSync from "@aduh95/viz.js/sync";

const textArea = document.getElementById('text-input-textarea');
const textInput = document.getElementById('text-input')
const svgContainer = document.getElementById('svg-container');
const divider = document.getElementById('divider');
const fileUpload = document.getElementById('file-upload');

const resizeObserver = new ResizeObserver(() => {
    updateSvg();
});
resizeObserver.observe(svgContainer);

textArea.value = `Table users {
    id integer
    username varchar
    role varchar
    created_at timestamp
}

Table posts {
    id integer [primary key]
    title varchar
    body text [note: 'Content of the post']
    user_id integer
    created_at timestamp
}

Ref: posts.user_id > users.id // many-to-one`;

textArea.style.width = '100%';
//textArea.style.height = '100%';
textArea.style.resize = 'horizontal';
textArea.rows = 30;

textArea.addEventListener('input', () => {
    updateSvg();
});

let isResizing = false;

divider.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
    });
});

function handleMouseMove(e) {
    if (isResizing) {
        const containerRect = document.body.getBoundingClientRect();
        const leftWidth = e.clientX - containerRect.left;
        const totalWidth = containerRect.width;
        const leftPercentage = (leftWidth / totalWidth) * 100;
        textInput.style.width = `${leftPercentage}%`;
    }
}

fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        textArea.value = e.target.result;
        updateSvg();
    };
    reader.readAsText(file);
});

function updateSvg() {
    const svgWidth = svgContainer.clientWidth;
    const errorBox = document.getElementById('error-box');
    try {
        const svgContent = run(textArea.value, 'svg', { width: svgWidth }); // Call the run function with the DBML text, format 'svg', and width
        svgContainer.innerHTML = svgContent;
        errorBox.style.display = 'none';
    } catch (error) {
        // Display the error box and show the error message
        errorBox.textContent = `Error: ${error.message}`;
        errorBox.style.display = 'block';
    }
}
