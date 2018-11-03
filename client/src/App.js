import React, { Component } from 'react';
import './App.css';
import API from "./utils/API";
import { Card, Col, Container, Jumbotron, List, Row } from "./components/Bootstrap";
import { ResultsItem, SaveBtn } from "./components/Results";
import { SavedItem, RemoveBtn } from "./components/Saved";
import { Input, SubmitBtn } from "./components/Search"

class App extends Component {
  state = { 
    topic: "",
    begin_year: "",
    end_year: "",
    results: [],
    saved: []
  }

  componentDidMount() {
    this.loadSaved();
  }

  loadResults = results => {
    this.setState({ topic: "", begin_year: "", end_year: "", results: results })
  }

  loadSaved = () => {
    API.getArticles()
      .then(res => 
        this.setState({ saved: res.data })
      )
      .catch(err => 
        console.log(err)
      );
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => 
        this.loadSaved()
      )
      .catch(err => 
        console.log(err)
      );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.searchArticles({
        q: this.state.topic,
        begin_date: this.state.begin_year + "0101",
        end_date: this.state.end_year + "1231"
      })
        .then(res => 
          this.loadResults(res)
        )
        .catch(err => 
          console.log(err)
        );
    }
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
