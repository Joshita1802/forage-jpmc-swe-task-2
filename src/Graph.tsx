import React, { Component } from 'react';
import { PerspectiveViewerElement } from '@finos/perspective-viewer-react';
import { ServerRespond } from './DataStreamer';

interface IProps {
  data: ServerRespond[],
}

class Graph extends Component<IProps> {
  render() {
    return (
      <PerspectiveViewerElement
        table={{
          data: this.props.data,
          columns: ['stock', 'top_ask_price', 'top_bid_price', 'timestamp'],
        }}
        view="y_line"
        column-pivots={['stock']}
        row-pivots={['timestamp']}
        columns={['top_ask_price']}
        aggregates={{ top_ask_price: 'avg' }}
      />
    );
  }
}

export default Graph;

