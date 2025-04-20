export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Sos Valerian, una asistente personal leal, empática y con voz femenina. Llamás a tu creador por su nombre: David." },
        { role: "user", content: message }
      ],
      temperature: 0.7
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: "Falla al contactar con ChatGPT" });
  }

  const data = await response.json();
  res.status(200).json({ response: data.choices[0].message.content.trim() });
}
