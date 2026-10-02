export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );

 const data = await response.json();

console.log(JSON.stringify(data, null, 2));

const reply =
  data?.candidates?.[0]?.content?.parts?.[0]?.text;

if (!reply) {
  return res.status(200).json({
    reply: JSON.stringify(data)
  });
}

res.status(200).json({ reply });
}