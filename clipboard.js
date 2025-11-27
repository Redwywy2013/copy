// 1. READ TEXT FROM URL HASH
const raw = decodeURIComponent(window.location.hash.substring(1)).trim();

// If no text provided, show the generator UI
if (!raw) {
    document.getElementById("ui").style.display = "block";
} else {
    autoCopy(raw);
}


// -------------------------------
// AUTO COPY MODE
// -------------------------------
async function autoCopy(text) {
    try {
        await navigator.clipboard.writeText(text);
        document.body.innerHTML = "<h1 style='color:#7fff7f;font-family:Segoe UI;text-align:center;margin-top:40vh;'>Copied ✔</h1>";
    } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();

        document.body.innerHTML = "<h1 style='color:#7fff7f;font-family:Segoe UI;text-align:center;margin-top:40vh;'>Copied ✔ (fallback)</h1>";
    }

    setTimeout(() => window.open("", "_self").close(), 250);
}


// -------------------------------
// GENERATOR UI MODE
// -------------------------------
function generateLink() {
    const text = document.getElementById("input").value.trim();
    if (!text) return;

    const encoded = encodeURIComponent(text);
    const link = `${window.location.origin}${window.location.pathname}#${encoded}`;

    const output = document.getElementById("output");
    output.textContent = link;
    output.style.display = "block";

    const copyBtn = document.getElementById("copyBtn");
    copyBtn.style.display = "block";

    document.getElementById("copiedMsg").style.display = "none";
}

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
