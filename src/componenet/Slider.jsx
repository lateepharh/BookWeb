import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Book1 from "./utils/book1.png";
import Book2 from "./utils/book2.jpg";
import Book3 from "./utils/book3.jpg";
import Book4 from "./utils/book4.jpg";
import Book5 from "./utils/book5.png";
import Book6 from "./utils/book6.jpg";
import Layout from "./Layout/Layout.module.css"

const sliderData = [
    {
        id:0,
        image:Book1
    },
    {
        id:1,
        image:Book2
    },
    {
        id:2,
        image:Book3
    },
    {
        id:3,
        image:Book4
    },
    {
        id:4,
        image:Book5
    },
    {
        id:5,
        image:Book6
    },
]
function Slider() {
   
  return (
    <main>
        <AliceCarousel autoPlay autoPlayInterval={3000}>
            {
                sliderData.map((e)=>{
                    return(
                        <img src={e.image} alt="" key={e.id} className={Layout.sliderimage} />
                    )
                })
            }
        </AliceCarousel>
    </main>
  )
}

export default Slider