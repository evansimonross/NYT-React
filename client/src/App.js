import React, { Component } from 'react';
import './App.css';
import API from "./utils/API";
import { Card, Col, Container, Jumbotron, List, Row } from "./components/Bootstrap";
import { ResultsItem } from "./components/Results";
import { SavedItem } from "./components/Saved";
import { Input, SubmitBtn } from "./components/Search"

class App extends Component {
  state = {
    q: "",
    begin_year: "",
    end_year: "",
    results: [],
    saved: []
  }

  componentDidMount() {
    this.loadSaved();
  }

  loadResults = results => {
    this.setState({ q: "", begin_year: "", end_year: "", results: results });
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

  saveArticle = index => {
    console.log(this.state.results[index])
    API.saveArticle(this.state.results[index])
      .then(res =>{
        console.log(res);
        this.loadSaved();
      })
      .catch(err => {
        console.log(err);
        this.loadSaved();
      });
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res =>{
        console.log(res);
        this.loadSaved();
      })
      .catch(err => {
        console.log(err);
        this.loadSaved();
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.q) {
      let params = {
        q: this.state.q
      }
      if(this.state.begin_year) { params.begin_date = this.state.begin_year + "0101"; }
      if(this.state.end) { params.end_date = this.state.end_year + "1231"; }
      API.searchArticles(params)
        .then(res => {
          this.loadResults(res.data);
        })
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
            <Col size="md-2" />
            <Col size="md-8">

              <Card header="Search">
                <form>
                  <Input
                    value={this.state.q}
                    onChange={this.handleInputChange}
                    name="q"
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
                  <SubmitBtn
                    disabled={!(this.state.q)}
                    onClick={this.handleFormSubmit}
                  >Submit</SubmitBtn>
                </form>
              </Card>

              <Card header="Results">
                <List>
                  {this.state.results.map((result, index) => (
                    <ResultsItem key={index}
                      index={index}
                      headline={result.headline.main}
                      web_url={result.web_url}
                      snippet={result.snippet}
                      save={this.saveArticle}
                    />
                  ))}
                </List>
              </Card>

              <Card header="Saved Articles">
                <List>
                  {this.state.saved.map(saved => (
                    <SavedItem key={saved._id}
                      id={saved._id}
                      headline={saved.headline}
                      web_url={saved.web_url}
                      snippet={saved.snippet}
                      date={saved.date}
                      delete={this.deleteArticle}
                    />
                  ))}
                </List>
              </Card>
            </Col>
            <Col size="md-2" />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
