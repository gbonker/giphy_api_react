import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search_bar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      gifData: '',
    };

    this.gifSearch = this.gifSearch.bind(this);
  }

  gifSearch(term) {
    const ROOT_URL = 'http://api.giphy.com/v1/gifs/search';
    const API_KEY = '&api_key=dc6zaTOxFJmzC';
    const LIMIT = '&limit=1';

    var self = this;
    axios.get(`${ROOT_URL}?q=${term}${API_KEY}${LIMIT}`)
    .then(function (response) {
      self.setState({ 
        gifData: response.data.data[0].embed_url 
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const gifSearch = _.debounce((term) => {this.gifSearch(term)}, 500);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Giphy Search</h2>
        </div>
        <div className="container">
          <SearchBar onSearchTermChange={gifSearch} />
          <iframe title="gif" src={this.state.gifData} width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen>
          </iframe>
        </div>
      </div>
    );
  }
}

export default App;
