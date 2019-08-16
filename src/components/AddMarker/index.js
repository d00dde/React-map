import React, {Component} from 'react';
import './AddMarker.css';

export default class AddMarker extends Component {
  
	state = {
		value: ''
	}

	onChangeInput = (e) => {
		this.setState({
			value: e.target.value
		});
	}

	onSubmit = (e) => {
		if(e.key !== 'Enter')
			return
		this.props.addMarker(this.state.value);
		this.setState({
			value: ''
		});
	}

  render () {
    return (
      <input type="text" 
      			 placeholder="Введите название маркера..."
      			 onChange={this.onChangeInput}	
      			 value={this.state.value}
      			 onKeyPress={this.onSubmit}/>
    );
  }
}

