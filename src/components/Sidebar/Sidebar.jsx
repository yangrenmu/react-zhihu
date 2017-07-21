import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.scss';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      themeList: []
    }
  }

  componentWillMount() {
    axios.get('https://zhihuapi.herokuapp.com/api/4/themes').then((res) => {
      this.setState({ themeList: res.data.others });
    });
  }

  render() {

    const renderTheme = this.state.themeList.map((item, index) => {
      return (
        <div className="themes" key={index} >
	        <Link to={`/theme/${item.id}`}>
						<span className="text">{item.name}</span>
						<i className="icon-add"></i>
					</Link>
				</div>
      )
    })

    return (
      <div style={{'display': this.props.style.display}} className="Sidebar">
				<div className="sideBar-content">
					<div className="sideBar-box">
						<div className="sideBar-header">
	            <div className="user">
	              <div className="avatar">
	                <img className="image" src="https://avatars0.githubusercontent.com/u/18193168" alt="avatar" />
	              </div>
	              <span className="name">yangrenmu</span>
	              <div className="address">
	                <i className="icon-github"></i>
	                <a className="link" href="https://github.com/yangrenmu">https://github.com/yangrenmu</a>
	              </div>
	            </div>
	          </div>
	          <div className="themeList">	          
	          	<div className="home">
	          		<Link to="/">
		              <i className="icon-home"></i>
		              <span className="text">首页</span>
	              </Link>  
	            </div>	                    
            {renderTheme}
          </div>
					</div>
        </div>
        <div onClick={this.props.transferSidebarShow} className="mask"></div>
			</div>
    )
  }
}
