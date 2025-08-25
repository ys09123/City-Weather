import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiKey = import.meta.VITE_APP_NEWS_API_KEY;
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=rain&sortBy=publishedAt&language=en&apiKey=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
