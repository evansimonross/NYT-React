import React, { Component } from 'react';
import './App.css';
import API from "./utils/API";
import { Card, Col, Container, Jumbotron, List, Row } from "./components/Bootstrap";
import { ResultsItem } from "./components/Results";
import { SavedItem } from "./components/Saved";
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
        <Jumbotron>
          <h1>New York Times Article Scrubber</h1>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col size="md-2"/>
            <Col size="md-8">

              <Card header="Search">
                <form>
                  <Input
                    value={this.state.topic}
                    onChange={this.handleInputChange}
                    name="topic"
                    placeholder="Topic (required)"
                  />
                  <Input
                    value={this.state.begin_year}
                    onChange={this.handleInputChange}
                    name="begin_year"
                    placeholder="Begin Year"
                  />
                  <Input
                    value={this.state.end_year}
                    onChange={this.handleInputChange}
                    name="end_year"
                    placeholder="End Year"
                  />
                  <SubmitBtn>Submit</SubmitBtn>
                </form>
              </Card>

              <Card header="Results">
                <List>
                  {this.state.results.map(result => (
                    <ResultsItem key={result.web_url}
                      headline={result.headline}
                      web_url={result.web_url}
                      snippet={result.snippet}
                    />
                  ))}
                </List>
              </Card>

              <Card header="Saved Articles">
                <List>
                  {this.state.saved.map(saved => (
                    <SavedItem key={saved.id}
                      id={saved.id}
                      headline={saved.headline}
                      web_url={saved.web_url}
                      snippet={saved.snippet}
                      date={saved.created}
                    />
                  ))}
                </List>
              </Card>
            </Col>
            <Col size="md-2"/>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
