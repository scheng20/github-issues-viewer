import React, {Component} from 'react';
import Search from "./Components/Search";
import Results from "./Components/Results";
import Header from "./Components/Header";
import Filters from "./Components/Filters";
import Footer from "./Components/Footer";
import './Styles/App.css';

class App extends Component {

  // Initialize state
  state = {
    owner: '',
    repo: '',
    url: '',
    allIssues: [],
    filteredIssues: [],
    showResults: false,
    error: '',
  };

  // Process inputted URL and store relevant information into state
  handleURL = (event) => {

    const url = event.target.value;

    const array = url.split("/");
    const owner = array[array.length-2];
    const repo = array[array.length-1];

    this.setState({ owner: owner, repo: repo, url: url});
  }
  
  // Get all issues from GitHub API and store into state + handle errors
  getAllIssues = (event) => {

    event.preventDefault();

    // Note: this query will only fetch the first 30 results
    let url = `https://api.github.com/repos/${this.state.owner}/${this.state.repo}/issues?state=all&page=0&per_page=30`;

    fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => {
      this.setState({allIssues: responseJson, error: ''}, () => {this.setState({showResults: true})});
    })
    .catch((error) => {
      this.setState({error: 'Please enter a valid URL!'});
    });
  }

  // Filter issues retrieved
  getFilteredIssues = (eventkey) => {

    let result = [];

    switch (eventkey) {

      case 'open': {

        result = this.state.allIssues.filter(issue => {
          return issue.state === 'open';
        });

        break;
      }

      case 'closed': {
        
        result = this.state.allIssues.filter(issue => {
          return issue.state === 'closed';
        });
        
        break;
      }

      case 'pull': {

        result = this.state.allIssues.filter(issue => {
          return issue.pull_request !== undefined;
        });

        break;
      }

      default: {
        result = this.state.allIssues;
      }

    }

    this.setState({filteredIssues: result});
  }

  // Reset everything back to the beginning
  reset = (event) => {
    this.setState({
      owner: '',
      repo: '',
      url: '',
      allIssues: [],
      filteredIssues: [],
      showResults: false,
      error: ''
    });
  }

  // Show either the search page or the results page
  showPage() {

    if (this.state.showResults) {
      return (
        <div>
          <Header url = {this.state.url} handleClick = {this.reset}/>
          <Filters handleSelection ={this.getFilteredIssues}/>
          <Results issues = {(this.state.filteredIssues.length && this.state.filteredIssues) || this.state.allIssues}/>
          <Footer/>
        </div>
      );
    }
    
    return <Search getIssues={this.getAllIssues} handleChange = {this.handleURL} error = {this.state.error}/>;
  }

  // Render out the page content
  render () {
    return (
      <div>
        {this.showPage()}
      </div>
    );
  }
}

export default App;

