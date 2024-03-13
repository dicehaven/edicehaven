import React from 'react'
import PageHeader from '../components/PageHeader';
const subTitle = "About Our Brand";
const title = "Shopping Journey for Board Game Enthusiasts world wide";
const desc = "DiceHaven aims to capitalize on the growing demand for board games by creating an online platform that caters to board game enthusiasts worldwide."

const year = "3k+";
const expareance = "of Games";

const aboutList = [
    {
        imgUrl: '/src/assets/images/about/icon/01.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Global Reach',
        desc: 'Distinctively provide world wide services',
    },
    {
        imgUrl: '/src/assets/images/about/icon/02.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Real-time Inventory',
        desc: 'Distinctively provide world wide services',
    },
    {
        imgUrl: '/src/assets/images/about/icon/03.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Wide Product Range',
        desc: 'Distinctively provide world wide services',
    },
]
const About = () => {
    return (
      <div>
          <PageHeader title={'About Our Brand'} curPage={'About'} />
          <div className="about-section style-3 padding-tb section-bg">
                  <div className="container">
                      <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
                          <div className="col">
                              <div className="about-left">
                                  <div className="about-thumb">
                                      <img src="/src/assets/images/about/01.jpg" alt="about" />
                                  </div>
                                  <div className="abs-thumb">
                                      <img src="/src/assets/images/about/02.jpg" alt="about" />
                                  </div>
                                  <div className="about-left-content">
                                      <h3>{year}</h3>
                                      <p>{expareance}</p>
                                  </div>
                              </div>
                          </div>
                          <div className="col">
                              <div className="about-right">
                                  <div className="section-header">
                                      <span className="subtitle">{subTitle}</span>
                                      <h2 className="title">{title}</h2>
                                      <p>{desc}</p>
                                  </div>
                                  <div className="section-wrapper">
                                      <ul className="lab-ul">
                                          {aboutList.map((val, i) => (
                                              <li key={i}>
                                                  <div className="sr-left">
                                                      <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                  </div>
                                                  <div className="sr-right">
                                                      <h5>{val.title}</h5>
                                                      <p>{val.desc}</p>
                                                  </div>
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
      </div>
    )
  }
  
  export default About