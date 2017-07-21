import React from 'react';
import {
  HashRouter  as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from '../components/Home/Home.jsx';
import Article from '../components/Article/Article.jsx';
import Comment from '../components/Comment/Comment.jsx';
import Theme from '../components/Theme/Theme.jsx';

export default class Routers extends React.Component {
  render() {
    return (
      <Router>
				<div>
					<Switch>
						<Route exact path="//" component={Home}></Route>	
            <Route path="/article/comment/:id" component={Comment}></Route>
            <Route path="/article/:id" component={Article}></Route>
            <Route path="/theme/:id" component={Theme}></Route>					
					</Switch>
				</div>
			</Router>
    )
  }  
}
