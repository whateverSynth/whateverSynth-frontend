import React from 'react';
import Dimensions from 'react-dimensions';
import PropTypes from 'prop-types';

class DimensionsProvider extends React.Component {
  render() {
    return (
      <div>
        {this.props.children({
          containerWidth: this.props.containerWidth,
          containerHeight: this.props.containerHeight,
        })}
      </div>
    );
  }
}

export default Dimensions()(DimensionsProvider);

DimensionsProvider.propTypes = { 
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  children: PropTypes.any
};
