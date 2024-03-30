import React from 'react';
import Layout from '../components/Layout/Layout.js'
import porsche from '../assets/pp.mp4'
import './Homepage.css'
import bag from '../assets/bag.png'
import sling from '../assets/sling.png'
import apparels from '../assets/apparel.png'
import tech from '../assets/tech.png'
import nfp from '../assets/newpro.png'
import {Link} from 'react-router-dom';
import backpack from '../assets/bbb.jpg'
import women from '../assets/ww.jpg';
import men from '../assets/mmm.jpg';
import owl from '../assets/owlcard.jpg';
import last from '../assets/last.png'
import ig from '../assets/ig.png';
import yt from '../assets/y.png';
import tt from '../assets/tt.png';



const BackgroundVideo = () => {
  return (
    <Layout>
      {/* video 
       */}
      <div className='vid-main'>
        <video src={porsche} autoPlay loop muted></video>
        <div className='content'>
          <h1>Fashion Is Freedom</h1>
        </div>
      </div>
{/* 
       shop by categories */}
      <div className='shop-by-cat'>
        <div className='sbc-content'>
          <h1>Shop By Category</h1>
        </div>
        <div className='sbc-categories'>
          <img src={bag} width={200}/>
          <img src={sling} width={200}/>
          <img src={apparels} width={250} />
          <img src={tech} width={200}/>
        </div>
      </div>
{/* 
       bello new product */}
      <div className='new-feat-prod'>
        <div className='nfp-img'>
          <img src={nfp} width={400} />
        </div>
        <div className='nfp-content'>
            <h1>Bello New Product</h1>
            <h3>1999/-</h3>
            <Link className='learn'>Learn More</Link>
            <div className='nfp-btn'>
              <button className='nb'>Shop Now</button>
            </div>
        </div>
      </div>

{/* 
      bello mens womens and backpacks */}
      <div className='maj-cats' style={{ position: 'relative' }}>
        <div className='first-img' style={{position: 'relative'}}>
        <img src={backpack}/>
        <div className='maj-cats-content'>
        <h1>Backpacks</h1>
        <button className='bor-btn'>View More</button>
        </div>
      </div>
      <div className='mandw'>
        <div className='wom' style={{position: 'relative'}}>
          <img src={women}/>
          <div className='maj-cats-content'>
          <h1>Womens</h1>
          <button className='bor-btn'>View More</button>
          </div>
        </div>
        <div className='men' style={{position: 'relative'}}>
          <img src={men}/>
          <div className='maj-cats-content'>
          <h1>Mens</h1>
          <button className='bor-btn'>View More</button>
          </div>
        </div>
      </div>
    </div>



    {/* owl card and shipping */}
    <div className='owl-container'>
      <div className='owl' style={{position:'relative'}}>
        <img src={owl}/>
        <div className='owl-content'>
        <button className='owl-btn'>View More</button>
        </div>
      </div>
      <div className='shipping'>
        <h1>Shipping and Returns</h1>
        <p>To deliver your favorite products, we have become partners with the most reliable companies. We are ready to entrust them with your orders and are always on your side if something goes wrong.</p>
        <p>We will be happy to assist you for eligible returns, with a return instructions and the return shipping address. If you need a return or exchange, send us an email so we can discuss a replacement.</p>
        <p>Have a query? Contact us</p>
        <button className='contact-btn'>Contact us</button>
      </div>
    </div>


    <div className='homlast'>
      <div className='hl-content'>
        <h1>Come Visit Us</h1>
        <h4>Showroom</h4>
        <p>Jwalakhel, Lalitpur</p>
        <p><a href='https://www.google.com/maps/place/Bello+Nepal/@27.6720378,85.3130606,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb192e79c9f781:0xa6e7f6d733d62463!8m2!3d27.6720378!4d85.3156355!16s%2Fg%2F11l2m6msw8?entry=ttu'>Get Directions</a></p>
        <h4>Store Opening Hours</h4>
        <p>We are open everyday 10:00 AM — 6:30 PM</p>
        <p>9702651054</p>
        <p>bellofornepal@gmail.com</p>

        <div className='socials'>
          <img src={ig}/>
          <img src={yt}/>
          <img src={tt}/>
        </div>
      </div>
      <div className='hl-img'>
        <img src={last}/>
      </div>
    </div>
      
    </Layout>
  );
};

export default BackgroundVideo;

