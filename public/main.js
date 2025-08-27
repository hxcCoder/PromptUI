const $ = (s) => document.querySelector(s);
const statusEl = $("#status");
const frame = $("#frame");
const btnGen = $("#btnGen");
const btnZip = $("#btnZip");

let lastBundle = null;

btnGen.onclick = async () => {
  const prompt = $("#prompt").value.trim();
  if (!prompt) return alert("Escribe un brief");

  setStatus("Generando…");
  btnGen.disabled = true;
  btnZip.disabled = true;
  writePreview("<h2 style='font-family:sans-serif;padding:20px'>Generando…</h2>");

  try {
    const r = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await r.json();
    if (!r.ok || data.error) throw new Error(data.detail || data.error);

    lastBundle = data;
    const index = data.files.find(f => f.name === "index.html");
    if (index) writePreview(index.content);
    btnZip.disabled = false;
    setStatus("Listo ✅");
  } catch (e) {
    console.error(e);
    setStatus("Error: " + e.message);
    writePreview("<p style='padding:20px;color:#b91c1c'>Ocurrió un error al generar.</p>");
  } finally {
    btnGen.disabled = false;
  }
};

btnZip.onclick = async () => {
  if (!lastBundle) return;
  const zip = new JSZip();
  for (const f of lastBundle.files) {
    zip.file(f.name, f.content);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "ui.zip");
};

function setStatus(t) { statusEl.textContent = t; }

function writePreview(html) {
  const doc = frame.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
}

