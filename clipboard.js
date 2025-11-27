// Get hash (compressed text)
let hash = window.location.hash.substring(1).trim();

// If nothing provided → show generator UI
if (!hash) {
    document.getElementById("ui").style.display = "block";
} else {
    // Try to decompress the hash
    let text = LZString.decompressFromEncodedURIComponent(hash);

    // If decompression fails → treat hash as UNCOMPRESSED plain text
    if (!text) text = hash;

    autoCopy(text);
}


// ----------------------------------------------------
// AUTO COPY MODE
// ----------------------------------------------------
async function autoCopy(text) {
    try {
        await navigator.clipboard.writeText(text);
        document.body.innerHTML =
            "<h1 style='color:#7fff7f;text-align:center;margin-top:40vh;'>Copied ✔</h1>";
    } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        document.body.innerHTML =
            "<h1 style='color:#7fff7f;text-align:center;margin-top:40vh;'>Copied ✔ (fallback)</h1>";
    }

    setTimeout(() => window.open("", "_self").close(), 250);
}



// ----------------------------------------------------
// GENERATOR UI (this is where REAL compression happens)
// ----------------------------------------------------
function generateLink() {
    const text = document.getElementById("input").value.trim();
    if (!text) return;

    // 🔥 THIS IS THE ACTUAL COMPRESSION
    const compressed = LZString.compressToEncodedURIComponent(text);

    // Build URL
    const link =
        `${window.location.origin}${window.location.pathname}#${compressed}`;

    // Show output
    const output = document.getElementById("output");
    output.textContent = link;
    output.style.display = "block";

    document.getElementById("copyBtn").style.display = "block";
    document.getElementById("copiedMsg").style.display = "none";
}



// ----------------------------------------------------
// COPY GENERATED LINK
// ----------------------------------------------------
async function copyLink() {
    const link = document.getElementById("output").textContent;

    try {
        await navigator.clipboard.writeText(link);
    } catch {
        const ta = document.createElement("textarea");
        ta.value = link;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
    }

    document.getElementById("copiedMsg").style.display = "block";
}
