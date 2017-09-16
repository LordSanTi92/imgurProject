import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchBar.jsx';
import PageWithPics from './components/PageWithPics.jsx'
import BigPicture from './components/bigPicture.jsx';
import $ from 'jquery';
// https://api.imgur.com/3/gallery/t/cosplay  by tag
// https://api.imgur.com/3/gallery/search/{sort}/{page}  url:
// 'https://api.imgur.com/3/gallery/search/top/1/?q=cosplay' by search,
// https://api.imgur.com/3/gallery/search/top/1/?q=title:cosplay' by title
require('../scss/style.scss');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrayOfPages: [],
      bigImg: '',
      whichPage: '',
      positionInArrayOfBigImg: ''
    }
    this.counter = 0;
    this.phrase = '';
    this.allLoaded = 'load';
    this.arrayWithLinksForBigIMG = [];
    this.arrayWithLikesForBigIMG = [];
    this.arrayWithDislikesForBigIMG = [];
    this.arrayWithScoreForBigIMG = [];

  }

  searchPhrase = searchedPhrase => {
    this.counter = 0;
    this.phrase = searchedPhrase;
    if (this.state.arrayOfPages.length == 0) {
      this.setState({
        arrayOfPages: [
          ...this.state.arrayOfPages, {
            page: this.counter,
            phrase: this.phrase
          }
        ]
      })
    } else {
      this.setState({
        arrayOfPages: []
      }, () => {
        this.setState({
          arrayOfPages: [
            ...this.state.arrayOfPages, {
              page: this.counter,
              phrase: this.phrase
            }
          ]
        })
      })
    }
  }

  componentDidMount = () => {
    let timer = 0;
    let lastTimer = 0;
    let minTimeout = 100;
    document.addEventListener('scroll', () => {
      if ($(document).height() == $(document).scrollTop() + $(window).height()) {
        if (this.allLoaded == 'load') {
          let timeStamp = new Date().getTime();
          if (!timer) {
            if (timeStamp - lastTimer > (5 * minTimeout)) {
              this.addNextPageWithPics();
              lastTimer = timeStamp;
            }
            timer = setTimeout(function () {
              timer = null;
              lastTimer = new Date().getTime();
            }, minTimeout);
          }
        }
      }
    })
  }

  checkIfAllPossibleImgLoaded = info => {
    if (info == 'done') {
      this.allLoaded = 'done'
    }
  }

  addNextPageWithPics = () => {
    this.counter++;
    this.setState({
      arrayOfPages: [
        ...this.state.arrayOfPages, {
          page: this.counter,
          phrase: this.phrase
        }
      ]
    })
  }

  arraysOfData = (links, likes, dislikes, score) => {
    this
      .arrayWithLinksForBigIMG
      .push(links);
    this
      .arrayWithLikesForBigIMG
      .push(likes);
    this
      .arrayWithDislikesForBigIMG
      .push(dislikes);
    this
      .arrayWithScoreForBigIMG
      .push(score);
  }

  checkWhichImg = (linkOfImg, positionInArray, whichPage) => {
    this.setState({bigImg: linkOfImg, positionInArrayOfBigImg: positionInArray, whichPage: whichPage})
  }

  closeBigImg = closing => {
    this.setState({bigImg: closing})
  }

  render() {
    let bigPicture;
    if (this.state.bigImg == '') {
      bigPicture = null
    } else {
      bigPicture = <BigPicture
        whichPage={this.state.whichPage}
        imgLink={this.state.bigImg}
        imgPositionInArray={this.state.positionInArrayOfBigImg}
        arrayForBigIMG={this.arrayWithLinksForBigIMG}
        arrayWithLikes={this.arrayWithLikesForBigIMG}
        arrayWithDislikes={this.arrayWithDislikesForBigIMG}
        arrayWithScore={this.arrayWithScoreForBigIMG}
        closeBigImg={this.closeBigImg}/>
    }
    return <div>
      <SearchBar phrase={this.searchPhrase}/> {this.state.arrayOfPages.length
        ? this
          .state
          .arrayOfPages
          .map((component, index) => {
            return <PageWithPics
              key={index}
              linksToImgs={this.arraysOfData}
              checkWhichImg={this.checkWhichImg}
              checkIfAll={this.checkIfAllPossibleImgLoaded}
              page={component.page}
              phrase={component.phrase}/>
          })
        : null}
      {bigPicture}
    </div>
  }
}

ReactDOM.render(
  <App/>, document.getElementById('app'))
