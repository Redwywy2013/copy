// Parse URL param: ?t=your text here
const params = new URLSearchParams(window.location.search);
const text = params.get("t") || "";

// Decode + cleanup
const decoded = decodeURIComponent(text.replace(/\+/g, " "));

// Function to copy text to clipboard
async function doCopy() {
    if (!decoded) {
        document.body.innerHTML = "No text provided.";
        return;
    }

    try {
        await navigator.clipboard.writeText(decoded);
        document.body.innerHTML = "Copied ✔";
    } catch (err) {
        // Fallback: create hidden textarea
        const ta = document.createElement("textarea");
        ta.value = decoded;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        document.body.innerHTML = "Copied ✔ (fallback)";
    }

    // Give browser 300ms, then close if allowed
    setTimeout(() => {
        window.open("","_self").close();
    }, 300);
}

doCopy();
