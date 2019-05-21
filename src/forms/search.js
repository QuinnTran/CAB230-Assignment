import React from 'react';

class Ser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: '', hits: [] };
  }

  onChange = event => {
    this.setState({ query: event.target.value });
  };

  onSearch = event => {
    event.preventDefault();

    const { query } = this.state;

    if (query === '') {
      return;
    }
  
      fetch("https://cab230.hackhouse.sh/search?offence=" + query)
        .then(response => response.json())
        .then(result => this.onSetResult(result, query));
    };
  
    onSetResult = (result, key) => {
      this.setState({ hits: result.hits });
    };
  
    render() {
      return (
        <div>
          <form>
            <input type="text" />
            <button type="submit">Search</button>
          </form>
  
          {/* Result */}
        {this.state.hits.map(item => (
          <div key={item.objectID}>{item.title}</div>
        ))}
        </div>
      );
    }
  }

export default Ser;