import React, { useState } from 'react'
import './About.css'
import about_img from '../../assets/prof-read-book.jpg'
import play_icon from '../../assets/play.png'
import about_vid from '../../assets/advertisement.mp4'
const About = () => {

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className='about'>
      <div className="about-left">
        {!isVideoPlaying?(<><img src={about_img} alt="" className='about_img'/>
        <img src={play_icon} alt="" className='play_icon' onClick={handlePlayClick}/></>):
        (
          <video controls autoPlay className="about_vid" onEnded={handleVideoEnd} volume={0.1} style={{ width: 'auto', height: 'auto' }}>
            <source src={about_vid} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="about-right">
        <h3>More Detail about Us</h3>
        <h2>Welcome to Sunny Papyrus Bookstore, a cozy haven for book lovers.</h2>
        <p>Our collection offers something for everyone, from timeless classics to the latest
           bestsellers, inspiring nonfiction, and enchanting stories for all ages. Step inside 
           to explore a world of imagination and discovery, where every visit sparks joy and 
           every book brings a little sunshine to your day.</p>
        <p>Whether you're a seasoned book lover or just beginning your literary journey, Sunny 
           Papyrus Bookstore is the perfect place to find inspiration and escape. Our carefully 
           curated sections are designed to make browsing a delight, with knowledgeable staff ready 
           to guide you toward the perfect read.</p>
      </div>
    </div>
  )
}

export default About