import React, { Component } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./css/style.css";

export default class SuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      timer: 3,
      data: [],
      inpVal:
        this.props.input == null || this.props.input == undefined
          ? ""
          : this.props.input,
    };
    this.handleGetData = this.handleGetData.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.getDataFromListData = this.getDataFromListData.bind(this);
  }

  handleGetData(e) {
    var keyword = e.target.value;
    keyword = keyword.trim();

    var getDataFunc = this.props.apiFunc;
    this.setState({ inpVal: keyword });
    if (keyword == "") {
      this.setState({
        data: [],
        selectValue: keyword,
      });
    } else
      setTimeout(() => {
        getDataFunc(keyword).then((response) => {
          if (response.data.results != null)
            this.setState({
              data: response.data.results,
              selectValue: keyword,
            });
          else if (response.data != null)
            this.setState({
              data: response.data,
              selectValue: keyword,
            });
        });
      }, 200);
  }

  onItemClick(e) {
    var selectItem = this.getDataFromListData(e.target.getAttribute("index"));
    if (this.props.callBackClick != undefined)
      this.props.callBackClick(selectItem);
    this.setState({ data: null, inpVal: selectItem[this.props.valueName] });
  }

  getDataFromListData(index) {
    var rs = null;
    this.state.data.forEach((element) => {
      if (element[this.props.idName] == index) {
        rs = element;
      }
    });
    return rs;
  }

  buildTemplateItems() {
    if (this.state.data == null) return null;
    if (!Array.isArray(this.state.data)) return null;
    if (this.state.data.length == 0) return null;
    var template = this.state.data.map((el) => {
      var i = el[this.props.idName];
      var addition = null;
      if (this.props.addition != null) {
        addition = this.props.addition.map((e) => {
          return (
            <p index={i} className="mouse-cursor pl-3">
              {el[e]}
            </p>
          );
        });
      }
      return (
        <li
          className="item-suggest mouse-cursor pl-2"
          index={i}
          onClick={(e) => this.onItemClick(e)}
        >
          <h6 className="mouse-cursor" index={i}>
            {el[this.props.valueName]}
          </h6>
          {addition}
        </li>
      );
    });

    return <ul className="mouse-cursor suggest-box">{template}</ul>;
  }

  render() {
    return (
      <div>
        <input
          id="input-suggest"
          className="form-control"
          onChange={(e) => this.handleGetData(e)}
          placeholder="Tìm kiếm"
          value={this.state.inpVal}
          //onBlur={() => {}}
        />

        {this.buildTemplateItems()}
      </div>
    );
  }
}
