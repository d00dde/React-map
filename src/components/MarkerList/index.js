import React, {Component} from 'react';
import Sortable from 'Sortable'
import './MarkerList.css'

export default class MarkerList extends Component {
  
  componentDidMount () {
    new Sortable (document.querySelector('.list-group'), {
      animation: 150,
      ghostClass: 'blue-background-class'
    });
    this.setOrder();
  }

  setOrder = () => {
      let order = [].map.call(document.querySelector('.list-group')
      .children, (li) => {
        return li.id;
      });
    this.props.setOrder(order);
  }

  componentDidUpdate () {
    this.setOrder();
  }

  render () {
    const markersJSX = this.props.markers.map(({id, title}) => {
      return <li className="list-group-item" key={id} id={id}>
        {title}
        <span className='remove'
              onClick={() => this.props.delete(id)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </li>
    });

    return (
      <div className="marker-list container" >
        <ul className="list-group col" 
        onDragEnd={this.setOrder}>
        {markersJSX}
        </ul>
      </div>
    );
  }


}

