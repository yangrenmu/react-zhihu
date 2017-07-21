import React from 'react';
import axios from 'axios';
import './Theme.scss';

export default class Theme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeDes: ''
    };
    this.back = this.back.bind(this);
  }

  componentWillMount() {
    axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes/' + this.props.match.params.id).then(res => {
      this.setState({ themeDes: res.data.THEMEDES });
    });
  }

  back() {
    this.props.history.goBack();
  }

  render() {
    let editors = '';
    let themeStories = '';
    if (this.state.themeDes) {
      editors = this.state.themeDes.editors.map((item, index) => {
        return (
          <div className="avatar" key={index}>
						<img className="image" src={item.avatar} alt="avatar"/>
					</div>
        );
      });
      themeStories = this.state.themeDes.stories.map((item, index) => {
        return (
          <div className="article-wrap" key={index}>
      			<div className="article">
      				<span className="text">{item.title}</span>
      				{(() => {
      					if (item.images) {
      						return (
      							<div className="image-box">
				              <img src={item.images} className="image" alt="cover"/>
				            </div>
				          )	      					
	      				}
      				})()}
      					            
      			</div>
      		</div>
        )
      })
    }    

    return (
      <div className="theme">
      	<header className="header">
		      <i onClick={this.back} className="icon-back"></i>
		      <div className="home">
		        <span className="text">{this.state.themeDes.name}</span>
		      </div>
		      <div className="more">
		        <i className="icon-follow"></i>
		      </div>
		    </header>
		    <section className="section">
		      <figure className="figure">
		        <span className="title">{this.state.themeDes.description}</span>
		        <img className="image" src={this.state.themeDes.background} alt="backgroundImage" />
		        <div className="mask"></div>
		      </figure>
		      <article className="article-list">
		        <div className="editor">
		          <span className="text">主编</span>
		          {editors}
		        </div>
		        {themeStories}
		      </article>
    		</section>
      </div>
    )
  }
}
