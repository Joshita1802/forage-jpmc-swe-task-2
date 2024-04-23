import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  private interval: NodeJS.Timeout | null = null; // Variable to hold the interval reference

  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false, // Initialize showGraph to false
    };
  }

  /**
   * Start fetching data from the server at regular intervals
   */
  startStreamingData() {
    this.interval = setInterval(() => {
      this.getDataFromServer();
    }, 100); // Fetch data every 100ms
  }

  /**
   * Stop fetching data from the server
   */
  stopStreamingData() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Filter out duplicate data for stocks ABC and DEF
      const filteredData = serverResponds.filter((data) => data.stock !== 'ABC' && data.stock !== 'DEF');

      // Update the state by concatenating previous data with the new filtered data
      this.setState((prevState) => ({
        data: [...prevState.data, ...filteredData],
        showGraph: true, // Set showGraph to true once data is received
      }));
    });
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>);
    }
    return null;
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => { this.startStreamingData() }}>
            Start Streaming Data
          </button>
          <button className="btn btn-danger Stop-button"
            onClick={() => { this.stopStreamingData() }}>
            Stop Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

