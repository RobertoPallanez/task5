import React from "react";

function FiltersBar(props) {
  const levels = [10, 10];

  return (
    <div className="filtersBar">
      <form className="languageForm">
        <label className="languageLabel" htmlFor="options">
          Language
        </label>
        <select
          onChange={props.handleLanguage}
          className="languageInput"
          id="options"
          name="options"
        >
          <option value="fakerEN">English (US)</option>
          <option value="fakerES">Spanish (MXN)</option>
          <option value="fakerRU">Russian (RUS)</option>
        </select>
      </form>
      <div className="seedBox">
        <div className="seedText">
          <span className="seedWord">Seed</span>
          <input
            type="text"
            id="inputSeed"
            onChange={props.handleInputChange}
            onKeyDown={props.handleInputSeed}
            className="seedNumber"
            value={props.input}
          />
        </div>
        <img
          onClick={props.generateSeed}
          className="shuffleIcon"
          src="./shuffleIcon.svg"
        />
      </div>
      <div className="silderBox">
        <span className="sliderHeader">Likes: {props.sliderValue / 10}</span>
        <span className="sliderLines">| | | | | | | | | |</span>
        <input
          className="likeSlider"
          type="range"
          min="0"
          max="100"
          onChange={props.handleSliderChange}
        ></input>
      </div>
      {/* <div className="scoreBox">
        <div className="scoreText">
          <span className="reviewWord">Review:</span> */}
      {/* <span className="reviewScore">{props.reviewValue.toFixed(1)}</span> */}
      {/* <input
            type="number"
            onChange={props.changeReviews}
            className="reviewScore"
            value={props.reviewValue}
          />
        </div> */}
      {/* <div className="scoreButtons"> */}
      {/* <img
            className="upwardsIcon"
            src="./upwardsIcon.svg"
            onClick={props.increaseReviews}
          /> */}
      {/* <img
            className="downwardsIcon"
            src="./downwardsIcon.svg"
            onClick={props.decreaseReviews}
          />
        </div>
      </div> */}
      <div className="silderBox">
        <span className="sliderHeader">Reviews: {props.slider2Value / 10}</span>
        <span className="sliderLines">| | | | | | | | | |</span>
        <input
          className="likeSlider"
          type="range"
          min="0"
          max="100"
          onChange={props.handleSlider2Change}
        ></input>
      </div>
    </div>
  );
}

export default FiltersBar;
