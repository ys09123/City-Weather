import { useState, useEffect } from "react"
import axios from "axios"

const News = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(
                    `https://newsapi.org/v2/everything?q=rain&sortBy=publishedAt&language=en&apiKey=2b3eb064e84b44139b6c5bf9e1d95434`
                )
                setArticles(res.data.articles.slice(0, 6))
            } catch (err) {
                console.error("Failed to fetch news", err)
            }
        }
        fetchNews();
    }, [])

  return (
    <>
    <div className="flex justify-center font-stretch-105% font-extralight text-[#e0e4ec] text-3xl ">City Weather & News</div>
    <div className="grid grid-cols-3 gap-6 mt-6">
        {articles.map((article, index) => (
            <div
                key={index}
                className="bg-[#202B3E] p-4 rounded-[20px] shadow-lg hover:scale-105 transition"
            >
                <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-bold text-white mb-2">
                    {article.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3">
                    {article.description}
                </p>
                <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 mt-5 inline-block"
                >
                    Read more →
                </a>
            </div>
        ))}
    </div>
    </>
  )
}

export default News