import React from 'react';
import Slider from '../Slider/Slider.jsx';
import ArticleList from '../ArticleList/ArticleList.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import './Home.scss';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      homeClass: 'home',
      sidebarStyle: 'none'
    }
    this.showSidebar = this.showSidebar.bind(this);
  }



  showSidebar() {
    console.log(this.state.sidebarStyle);
    if (this.state.sidebarStyle === 'none') {
      this.setState({sidebarStyle: 'block'});
      this.setState({homeClass: 'home home-hidden'});
    } else {
      this.setState({sidebarStyle: 'none'});
      this.setState({homeClass: 'home'});
    }    
  }

  render() {
    return (
      <div className={this.state.homeClass}>
        <header className="header">
          <div onClick={this.showSidebar} className="menu">
            <i className="icon-menu"></i>
          </div>
          <div className="description">
            <span>首页</span>
          </div>
          <div className="icon">
            <i className="icon-bell"></i>
            <i className="icon-more"></i>
          </div>
        </header>
        <Slider></Slider>
        <ArticleList></ArticleList>
        <Sidebar transferSidebarShow={this.showSidebar} style={{'display': this.state.sidebarStyle}}></Sidebar>
      </div>
    );
  }
}
