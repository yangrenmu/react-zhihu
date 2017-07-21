import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Article.scss';
import '../../common/css/news_qa.auto.css';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: '',
      extraInfo: ''
    }
    this.back = this.back.bind(this);
    this.showHTML = this.showHTML.bind(this);
  }

  // axios 请求数据
  componentWillMount() {
    console.log(this.props.match.params.id);
    axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.props.match.params.id).then((res) => {
      this.setState({ article: res.data.CONTENTS });
    });
    axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/extra/' + this.props.match.params.id).then((res) => {
      this.setState({ extraInfo: res.data.DES });
    });
  }

  back() {
    this.props.history.goBack();
  }

  formatFavourNumber(value) {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    } else {
      return value;
    }
  }

  showHTML() {
    return {
      __html: this.state.article.body
    }
  }

  render() {
    return (
      <div className="article">
        <header className="header">
          <div onClick={this.back} className="back">
            <i className="icon-back"></i>
          </div>
          <div className="icon-wrapper">
            <div className="icons">
              <i className="icon-share icon"></i>
              <i className="icon-star icon"></i>
              <Link to={`/article/comment/${this.props.match.params.id}`}>
                <i className="icon-comment icon">
                  <span className="text">{this.state.extraInfo.comments}</span>
                </i>
              </Link>              
              <i className="icon-favour icon">
                <span className="text">{this.formatFavourNumber(this.state.extraInfo.popularity)}</span>
              </i>
            </div>
          </div>
        </header>
        <div className="content-wrapper">
          <div className="image-wrapper">
            <span className="title">{this.state.article.title}</span>
            <span className="image-source">{this.state.article.image_source}</span>
            <img src={this.state.article.image} className="image" alt="avatar" />
            <div className="mask"></div>
          </div>
          <div dangerouslySetInnerHTML={this.showHTML()}></div>
        </div>
      </div>
    );
  }
}
