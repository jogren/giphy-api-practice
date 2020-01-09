import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './SearchForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      images: []
    }
  }

  fetchImages = () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${this.state.search}`)
      .then(response => response.json())
      .then(data => this.setState({ images: data.data.map(image => image.images.fixed_width.url) }))
      .catch(error => console.log(error))
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.fetchImages();
    this.setState({ search: '' })
  }

  render() {
    let imagesList = this.state.images.map((imageUrl, index) => {
      return <img src={imageUrl} key={index} alt="img"/>
    })
    return (
      <main className="App">
        <SearchForm search={this.state.search} handleSearch={this.handleSearch} handleSubmit={this.handleSubmit}/>
        { imagesList }
      </main>
    );
  }
}

export default App;
