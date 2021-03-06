import React, { Component }from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users=> this.setState({robots: users}));	
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
	}


	render() {
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return !robots.length ?
		<h1 className='tc'>Loading...</h1> :
		(
				<div className='tc'>
					<h1 className='f1 ma3'>RoboFriends</h1>
					<h6 className='tc'>Welcome</h6>
					<SearchBox searchchange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
					<p className='footer tc'>imranmidday copyright, 2020 all right reserved</p>
				</div>
		);
	}
}
export default App;