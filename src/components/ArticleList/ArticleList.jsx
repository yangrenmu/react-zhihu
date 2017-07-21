import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ArticleList.scss';



export default class ArticleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      date: [],
      currentDate: '',
      REQUIRE: true
    };
    this.scrollBottom = this.scrollBottom.bind(this);
  }

  // axios 请求数据
  componentWillMount() {
    axios.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories').then((res) => {
      this.setState({ stories: this.state.stories.concat([res.data.STORIES.stories]) });
      this.setState({ date: this.state.date.concat([res.data.STORIES.date]) });
      this.setState({ currentDate: res.data.STORIES.date });
    });
  }

  // 监听滚动事件
  componentDidMount() {
    window.addEventListener('scroll', this.scrollBottom);
  }

  // 滚动事件
  scrollBottom() {
    // console.log(window.screen.height + document.body.scrollTop);
    // console.log(document.body.clientHeight);
    if (((window.screen.height + document.body.scrollTop) > document.body.clientHeight) && this.state.REQUIRE) {
      this.setState({ REQUIRE: false });
      // console.log(this.state.date);
      axios.get('https://zhihu-daily.leanapp.cn/api/v1/before-stories/' + this.state.currentDate).then((res) => {
        this.setState({ stories: this.state.stories.concat([res.data.STORIES.stories]) });
        this.setState({ date: this.state.date.concat([res.data.STORIES.date]) });
        this.setState({ currentDate: res.data.STORIES.date });
        this.setState({ REQUIRE: true });
      });
    }
  }

  // 移除滚动事件
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollBottom);
    // 组件卸载后，不进行axios请求
    // axiosFlag = false;
  }
  formatDate(index) {
    if (index === 0) {
      return '今日新闻';
    } else {
      if (this.state.date.length > index) {
        return this.getToday(index);
      }
    }
  }
  getToday(index) {
    let year = this.state.date[index].slice(0, 4);
    let month = this.state.date[index].slice(4, 6);
    let day = this.state.date[index].slice(6);
    let today = new Date(year + '/' + month + '/' + day);
    let week = ['日', '一', '二', '三', '四', '五', '六'];
    return `${month}月${day}日 星期${week[today.getDay()]}`;
  }
  render() {
    // console.log(this.state.stories);
    const renderStories = this.state.stories.map((items, index) => {
      // console.log(items);
      return (<div key={index}>
          <div className="date">{ this.formatDate(index) }</div>
          {items.map((item, index) => {
            return (
              <div className="list" key={ index } >
                <Link to={`/article/${item.id}`}>
                  <div className="story" >
                    <span className="title" > { item.title } </span>   
                    <img className="images" src={ item.images } alt="iamges" />
                  </div> 
                </Link>                 
              </div>
            ) 
          })}
        </div>);
    })
    return (<div className = "article-list" >  
        { renderStories }        
      </div>);
  }
}
