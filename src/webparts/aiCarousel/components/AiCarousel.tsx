import * as React from "react";
import styles from "./AiCarousel.module.scss";
import { IAiCarouselProps, ISPCarousel } from "./IAiCarouselProps";
import Slider, { Settings } from "react-slick";

export interface IAiCarouselWpState {
  bannerCardData: ISPCarousel[] | null; // Allow null for initial state
}

// Slider settings
const settings: Settings = {
  centerMode: false,
  dots: true,
  infinite: true,
  lazyLoad: "ondemand", // 'ondemand' or 'progressive' are the valid options
  slidesToScroll: 1,
  slidesToShow: 1,
  arrows: false,
  autoplay: true,
  speed: 1500,
  pauseOnHover: false,
  fade: true,
};

export default class AiCarousel extends React.Component<
  IAiCarouselProps,
  IAiCarouselWpState
> {
  public constructor(props: IAiCarouselProps) {
    super(props);
    this.state = {
      bannerCardData: props.bannerData || { value: [] }, // Initialize state with the passed prop or empty array
    };
  }

  public render(): React.ReactElement<IAiCarouselProps> {
    const { bannerCardData } = this.state;
    console.log("final data=", bannerCardData);

    const banners: JSX.Element[] = [];
    bannerCardData?.map((item, i) => {
      console.log("final data= item", bannerCardData);

      if (item?.RedirectUrl?.Url) {
        banners.push(
          <a key={i} className="AiSlide" href={item.RedirectUrl["Url"]}>
            {item?.Title ? (
              <span>{item.Title}</span>
            ) : (
              <p>{item.Description}</p>
            )}
            <img src={item?.ImageUrl["Url"]} alt={item?.Title} />
          </a>
        );
      } else {
        banners.push(
          <div key={i} className="AiSlide">
            {item?.Title ? (
              <span>{item.Title}</span>
            ) : (
              <p>{item.Description}</p>
            )}
            <img src={item?.ImageUrl["Url"]} alt={item?.Title} />
          </div>
        );
      }
    });

    console.log("render-- banners---", banners);
    return (
      <div className="AiSlider">
        <div className={styles.welcome}>
          <Slider {...settings}>{banners}</Slider>
        </div>
      </div>
    );

    console.log("render-----");
    // return (
    //   <div className={` ${styles.row}`}>
    //     <div className="col-12 col-md-6">
    //       <Slider {...settings}>
    //         {bannerCardData?.value.map((item, i) => (
    //           <div key={i} className={styles?.Bannercard}>
    //             <h2>{item?.Title}</h2>
    //             <p>{item?.Description}</p>
    //             <img src={item?.ImageURL}></img>
    //           </div>
    //         ))}
    //       </Slider>
    //     </div>
    //   </div>
    // );
  }
}
