import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import './Slider.scss';

export default class SliderPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: []
    }
  }

  componentWillMount() {
    axios.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories')
      .then((res) => {
        this.setState({ topStories: res.data.STORIES.top_stories });
      });
  }

  // react-slick 移动端不能自动轮播时，可以设置定时器解决。在 0.5 秒之前离开组件，会报错
  componentDidMount() {
    setTimeout(() => {
      this.slider.slickNext();
      this.slider.slickPrev()
    }, 500);
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      lazyLoad: true
    };
    let renderItems = this.state.topStories.map((item, index) => {
      return (
        <div key={index} className="slider-content">
          <Link to={`/article/${item.id}`}>
            <img className="image" src={item.image} alt="topStories"/>
            <span className="title">{item.title}</span>
            <div className="mask"></div>
          </Link>          
        </div>
      );
    });
    if (!this.state.topStories.length) {
      renderItems = <div></div>;
    }
    return (
      <div className="slider-wrap">
        <Slider ref={c => this.slider = c} {...settings} className="slider">
          {renderItems}
        </Slider>
      </div>
    );
  }
}
