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
		if(this.state.value === '')
			return
		this.props.addMarker(this.state.value);
		this.setState({
			value: ''
		});
	}

  render () {
    return (
      <input type="text"
			 className="form-control"
			 placeholder="Введите название маркера..."
			 onChange={this.onChangeInput}
			 value={this.state.value}
			 onKeyPress={this.onSubmit}/>
    );
  }
}

