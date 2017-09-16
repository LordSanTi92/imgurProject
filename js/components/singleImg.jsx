import React from 'react';
import ReactDOM from 'react-dom';
require('../../scss/singleIMG.scss');

class SingleIMG extends React.Component {
  handleClick = e => {
    let imgLink = e
      .target
      .getAttribute('src');
    let imgLinkArray = imgLink.split('.');
    if(imgLinkArray[3].indexOf('gif') == -1){
    imgLinkArray[2] = imgLinkArray[2].substring(0, imgLinkArray[2].length - 1)
    imgLink = imgLinkArray.join('.');
    }else{
      imgLink = imgLinkArray.join('.');
    }
    if (typeof this.props.checkWhichImg == "function") {
      this
        .props
        .checkWhichImg(imgLink, e.target.dataset.id, e.target.parentNode.parentNode.dataset.id);
    }
  }
  render() {
    return <div className="imageElement"><img
              onClick={this.handleClick}
              data-id={this.props.id}
              src={this.props.imgURL}/>
            </div>
  }
}
export default SingleIMG
