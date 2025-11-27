// Read everything after the "#"
const raw = decodeURIComponent(window.location.hash.substring(1));

async function doCopy() {
    const text = raw.trim();

    if (!text) {
        document.body.innerHTML = "No text found.";
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        document.body.innerHTML = "Copied ✔";
    } catch {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        document.body.innerHTML = "Copied ✔ (fallback)";
    }

    setTimeout(() => {
        window.open("", "_self").close();
    }, 200);
}

doCopy();
