import React, { Component } from 'react';

class AudioVisualizer extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    // eslint-disable-next-line react/prop-types
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    // eslint-disable-next-line react/prop-types
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    // context.strokeStyle = '#FFC0CB';
    context.strokeStyle = '#205757';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return <canvas width="1000" height="400" ref={this.canvas} />;
  }
}

export default AudioVisualizer;
