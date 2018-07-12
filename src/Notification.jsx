import React, {Component} from 'react';

class Notification extends Component {
  render() {
    return (
      <div className="message">
        <div className="message system">
            {this.props.message}
        </div>
      </div>
    )
  }
}

export default Notification