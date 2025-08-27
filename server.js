const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const HF_API_KEY = process.env.HF_API_KEY;
if (!HF_API_KEY) {
  console.error("❌ Falta HF_API_KEY en .env");
  process.exit(1);
}

// Prompt de sistema
const SYSTEM_PROMPT = `
Eres un generador de UI. Devuelve SOLO JSON válido.
Formato:
{
  "title": "string",
  "description": "string",
  "files": [
    {"name":"index.html","content":"..."},
    {"name":"styles.css","content":"..."},
    {"name":"script.js","content":"..."}
  ],
  "preview": "index.html"
}
Usa HTML semántico + Tailwind CDN + JS vanilla.
`;

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body ?? {};
    if (!prompt) return res.status(400).json({ error: "Falta prompt" });

    const body = {
      inputs: `${SYSTEM_PROMPT}\nBrief del usuario: ${prompt}\nResponde solo con JSON válido.`,
      parameters: { max_new_tokens: 500 }
    };

    const r = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await r.json();

    // HF devuelve texto en data[0].generated_text o error
    const text = data?.[0]?.generated_text || JSON.stringify(data);
    
    let parsed;
    try { parsed = JSON.parse(text); } 
    catch { 
      // fallback: mock para que la UI siga funcionando
      parsed = {
        title: "Demo UI",
        description: "Generado de prueba sin modelo",
        files: [
          { name: "index.html", content: `<h1>Preview: ${prompt}</h1>` }
        ],
        preview: "index.html"
      };
    }

    return res.json(parsed);

  } catch (err) {
    console.error("❌ Error interno:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/api/health", (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 5173;
app.listen(port, () => console.log(`✅ v0-portatil HF en http://localhost:${port}`));
