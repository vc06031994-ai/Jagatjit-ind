import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from '../../../api/contentful.js';
import '../Press/Press.css';



const Press = () => {
  const [news, setNews] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    // Fetching news items
    client.getEntries({ content_type: 'pressPageNews' })
      .then(response => {
        const newsData = response.items.map(item => ({
          title: item.fields.Title,
          link: item.fields.newsUrl,
          image: item.fields.newsImage?.fields?.file?.url,
        }));
        setNews(newsData);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });

    // Fetching achievements items
    client.getEntries({ content_type: 'pressPageAchievements' })
      .then(response => {
        const achievementsData = response.items.map(item => ({
          title: item.fields.title,
          link: item.fields.achievementsUrl,
          image: item.fields.achievementsImage?.fields?.file?.url,
        }));
        setAchievements(achievementsData);
      })
      .catch(error => {
        console.error('Error fetching achievements data:', error);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <>
      <div className="press-hero newstitle">
        <h1 className="heading-top">News</h1>
        <p className="firstDivParagraph">The inside Sip: Company Updates</p>
      </div>

      <div className="container mt-5 mb-5">
        {/* News Section */}
        <div className="row gy-3">
          {news.slice(0, visibleCount).map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 bg-dark text-white newsTexts">
                <img src={item.image} alt="News" className="card-img-top newsImg" />
                <div className="card-body">
                  <h5 className="card-title mt-3 cardnews">{item.title}</h5>
                  <p className="card-text">{item.discription}</p>
                  <div className="post-btn mt-auto">
                    <Link to={item.link} className="section3Button">Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < news.length && (
          <div className="text-center mt-4">
            <button onClick={handleLoadMore} className="section3Button">
              Load More
            </button>
          </div>
        )}

        {/* Achievements Section */}
        <div className="text-center mt-5 mb-5">
          <h1 className="g-heading-4-yellow">Achievements</h1>
          <p className="reportPara ouraward">Our Awards</p>
        </div>
        
        <div className="achive-sec">
          <div className="row gy-3">
            {achievements.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 bg-dark text-white">
                  <img src={item.image} alt="Achievement" className="newsImg" />
                  <div className="card-body">
                    <h5 className="card-title mt-3 cardachivement">{item.title}</h5>
                    <p className="card-text">{item.discription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Press;
