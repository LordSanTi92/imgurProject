import React from 'react';
import ReactDOM from 'react-dom';
require('../../scss/searchBar.scss');

class SearchBar extends React.Component {

  handleClick = e => {
    e.preventDefault();
    e.target.parentNode.classList.add('header');
    e.target.parentNode.classList.remove('fullView')
    if (typeof this.props.phrase === 'function') {
      this
        .props
        .phrase(this.input.value)
    }
  }
  render() {
    return <section>
              <form className="fullView">
                <input
                  id="search"
                  placeholder="Type phrase"
                  type='text'
                  ref={input => this.input = input}/>
                <input id="button" type="submit" onClick={this.handleClick} value="Search"/>
              </form>
            </section>
  }
}
export default SearchBar
