// Read hash (compressed)
let hash = window.location.hash.substring(1).trim();

// If there is no compressed text, show UI
if (!hash) {
    document.getElementById("ui").style.display = "block";
} else {
    // Decompress
    let text = LZString.decompressFromEncodedURIComponent(hash);

    if (!text) {
        document.body.innerHTML = "<h1 style='color:#f55;font-family:Segoe UI;text-align:center;margin-top:40vh;'>Invalid or corrupted link</h1>";
    } else {
        autoCopy(text);
    }
}


// ------------------------------------
// AUTO COPY MODE
// ------------------------------------
async function autoCopy(text) {
    try {
        await navigator.clipboard.writeText(text);
        document.body.innerHTML = "<h1 style='color:#7fff7f;text-align:center;margin-top:40vh;'>Copied ✔</h1>";
    } catch {
        let ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        document.body.innerHTML = "<h1 style='color:#7fff7f;text-align:center;margin-top:40vh;'>Copied ✔ (fallback)</h1>";
    }

    setTimeout(() => window.open("", "_self").close(), 250);
}


// ------------------------------------
// GENERATOR MODE
// ------------------------------------
function generateLink() {
    const text = document.getElementById("input").value.trim();
    if (!text) return;

    // Compress text
    const compressed = LZString.compressToEncodedURIComponent(text);

    // Build link
    const link = `${window.location.origin}${window.location.pathname}#${compressed}`;

    const output = document.getElementById("output");
    output.textContent = link;
    output.style.display = "block";

    document.getElementById("copyBtn").style.display = "block";
    document.getElementById("copiedMsg").style.display = "none";
}

async function copyLink() {
    const link = document.getElementById("output").textContent;

    try {
        await navigator.clipboard.writeText(link);
    } catch {
        let ta = document.createElement("textarea");
        ta.value = link;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
    }

    document.getElementById("copiedMsg").style.display = "block";
}
