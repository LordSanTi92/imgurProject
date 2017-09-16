import React from 'react';
import ReactDOM from 'react-dom';
import SingleIMG from './singleImg.jsx';
import $ from 'jquery';
require('../../scss/pageWithPics.scss');

class PageWithPics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataOfPics: 'loading',
      error: ''
    }
  }

  componentWillMount = () => {
    this.fetchData()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.dataOfPics.length == 0) {
      this
        .props
        .checkIfAll('done')
    }
  }

  fetchData = () => {
    $.ajax({
      url: 'https://api.imgur.com/3/gallery/search/time/' + this.props.page + '/?q=' + this.props.phrase,
      headers: {
        'Authorization': 'Client-ID e4f8791be524c5c'
      },
      json: true
    }).done((response) => {
      console.log(response.data)
      this.setState({
        dataOfPics: response.data
      }, () => {
        let arrayOfLinks = [];
        let arrayOfLikes = [];
        let arrayOfDislikes = [];
        let popularityScore = []
        this
          .state
          .dataOfPics
          .forEach((val, index) => {
            if (val.images == undefined) {
              arrayOfLinks.push(val.link);
            } else {
              arrayOfLinks.push(val.images[0].link);
            }
            arrayOfLikes.push(val.ups)
            arrayOfDislikes.push(val.downs)
            popularityScore.push(val.score)
          })
        this
          .props
          .linksToImgs(arrayOfLinks, arrayOfLikes, arrayOfDislikes, popularityScore);
      })

    }).fail((response) => {
      console.log(response.status);
      
    })
  }

  checkWhichImg = (linkOfImg, positionInArray, whichPage) => {
    if (typeof this.props.checkWhichImg == "function") {
      this
        .props
        .checkWhichImg(linkOfImg, positionInArray, whichPage);
    }
  }

  createThumbnail = smallIMG => {
    let smallIMGArray = smallIMG.split('.');
    if (smallIMGArray[3].indexOf('gif') == -1) {
      smallIMGArray[2] += 'm';
      let smallIMGThumbnail = smallIMGArray.join('.');
      return smallIMGThumbnail
    } else {
      return smallIMG = smallIMGArray.join('.');
    }
  }

  render() {
    let imgLoader;
    if (this.state.error != ''){
      imgLoader = <p>Error type {this.state.error}. Please refresh and try again.</p>;
    }
    else if (this.state.dataOfPics.length == 0) {
      imgLoader = <p>All images loaded</p>;
    } else if (this.state.dataOfPics == 'loading') {
      imgLoader = <p>Loading images...</p>;
    } else {
      imgLoader = this
        .state
        .dataOfPics
        .map((image, index) => {
          if (image.images == undefined) {
            let smallIMG = image.link;
            return <SingleIMG
              id={index}
              checkWhichImg={this.checkWhichImg}
              key={index}
              imgURL={this.createThumbnail(smallIMG)}/>
          } else {
            let smallIMG = image.images[0].link;
            return <SingleIMG
              id={index}
              checkWhichImg={this.checkWhichImg}
              key={index}
              imgURL={this.createThumbnail(smallIMG)}/>
          }
        })
    }
    return <div className="imageContent" data-id={this.props.page}>
      {imgLoader}
    </div>

  }
}
export default PageWithPics
