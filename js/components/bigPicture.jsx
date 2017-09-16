import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
require('../../scss/bigPicture.scss');

class BigPicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: this.props.imgPositionInArray,
      url: this.props.imgLink
    }
  }

  fbShare = () => {
    let winTop = (screen.height / 2) - (520 / 2);
    let winLeft = (screen.width / 2) - (350 / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=Facbook Share&p[url]=' + this.state.url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + 520 + ',height=' + 350);
  }

  twShare = () => {
    let winTop = (screen.height / 2) - (520 / 2);
    let winLeft = (screen.width / 2) - (350 / 2);
    window.open('https://twitter.com/home?status=' + this.state.url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + 520 + ',height=' + 350);
  }

  gplusShare = () => {
    let winTop = (screen.height / 2) - (520 / 2);
    let winLeft = (screen.width / 2) - (350 / 2);
    window.open('https://plus.google.com/share?url=' + this.state.url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + 520 + ',height=' + 350);
  }

  handleNext = () => {
    if (parseInt(this.state.counter) + 1 > this.props.arrayForBigIMG[this.props.whichPage].length - 1) {
      this.setState({
        counter: 0
      }, () => {
        this.setState({
          url: this.props.arrayForBigIMG[this.props.whichPage][this.state.counter]
        })
      })

    } else {
      this.setState({
        counter: parseInt(this.state.counter) + 1
      }, () => {
        this.setState({
          url: this.props.arrayForBigIMG[this.props.whichPage][this.state.counter]
        })
      })
    }
  }

  handlePrev = () => {
    if (parseInt(this.state.counter) - 1 < 0) {
      this.setState({
        counter: parseInt(this.props.arrayForBigIMG[this.props.whichPage].length - 1)
      }, () => {
        this.setState({
          url: this.props.arrayForBigIMG[this.props.whichPage][this.state.counter]
        })
      })

    } else {
      this.setState({
        counter: parseInt(this.state.counter) - 1
      }, () => {
        this.setState({
          url: this.props.arrayForBigIMG[this.props.whichPage][this.state.counter]
        })
      })
    }
  }

  handleClose = () => {
    this
      .props
      .closeBigImg('');
  }

  render() {
    return <div className="bigImageSection">
      <div className='infoSection'>
        <i className='fa fa-thumbs-o-up'>{this.props.arrayWithLikes[this.props.whichPage][this.state.counter]}</i>
        <i className='fa fa-thumbs-o-down'>{this.props.arrayWithDislikes[this.props.whichPage][this.state.counter]}</i>
        <i className='fa fa-fire'>{this.props.arrayWithScore[this.props.whichPage][this.state.counter]}</i>
        <i onClick={this.fbShare} className='fa fa-facebook'></i>
        <i onClick={this.twShare} className='fa fa-twitter'></i>
        <i onClick={this.gplusShare} className='fa fa-google-plus'></i>
      </div>
      <div className='bigImagePopUp'>
        <div className='prevButton'>
          <p onClick={this.handlePrev}>&lt;</p>
        </div>
        <div
          className='bigImage'
          style={{
          backgroundImage: 'url(' + this.state.url + ')'
        }}></div>
        <div className='nextButton'>
          <p className='next' onClick={this.handleNext}>&gt;</p>
          <p className='cross fa fa-times' onClick={this.handleClose}></p>
        </div>
      </div>
    </div>
  }
}
export default BigPicture
