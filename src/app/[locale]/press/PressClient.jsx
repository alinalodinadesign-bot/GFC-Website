'use client';

const articles = [
  {
    num: '01',
    title: 'Global Fashion Code Gives New Faces a Real Chance at a Modeling Contract',
    url: 'https://miamiwire.com/global-fashion-code-gives-new-faces-a-real-chance-at-a-modeling-contract/',
    img: '/images/press/01.jpg',
  },
  {
    num: '02',
    title: 'Anastasia Soldatova Creates a Space Where Talent Gets a Real Chance',
    url: 'https://nyweekly.com/fashion/anastasia-soldatova-creates-a-space-where-talent-gets-a-real-chance/',
    img: '/images/press/02.jpg',
  },
  {
    num: '03',
    title: 'Anastasia Soldatova on Uniting Fashion for Growth, Respect, and Connection',
    url: 'https://theamericannews.com/anastasia-soldatova-on-uniting-fashion-for-growth-respect-and-connection/',
    img: '/images/press/03.jpg',
  },
  {
    num: '04',
    title: 'Top Influential Women: The Leaders of Fashion, Beauty & Modern Power',
    url: 'https://fashionweekdaily.com/top-influential-women-the-leaders-of-fashion-beauty-modern-power/',
    img: '/images/press/04.jpg',
  },
];

export default function PressClient({ readMore }) {
  return (
    <div className="press-list">
      {articles.map((a) => (
        <a
          key={a.num}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="press-card"
        >
          <span className="press-card-num">( {a.num} )</span>
          <div className="press-card-img">
            <img src={a.img} alt={a.title} loading="lazy" />
          </div>
          <div className="press-card-body">
            <h2 className="press-card-title">{a.title}</h2>
            <span className="link-line">{readMore}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
