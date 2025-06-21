export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const userInput = req.body.message;

  const mensagens = [
    { role: "user", parts: [{ text: "O que é a Braileway?" }] },
    { role: "model", parts: [{ text: "Resposta." }] },
    { role: "user", parts: [{ text: "O que faz a Braileway?" }] },
    { role: "model", parts: [{ text: "Resposta." }] },
    { role: "user", parts: [{ text: "Aceita cartão de crédito?" }] },
    { role: "model", parts: [{ text: "Sim, aceitamos todos os cartões!" }] },
    { role: "user", parts: [{ text: userInput }] }
  ];

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: mensagens })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Erro na resposta.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Erro no servidor: " + error.message });
  }
}