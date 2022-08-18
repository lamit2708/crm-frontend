import React, { Component } from "react";
import SuggestInput from "../components/SuggestInput";
import customerService from "../services/customer.service";

export default class TestPage extends Component {
  testfunction(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        <SuggestInput
          apiFunc={customerService.search}
          idName="id"
          valueName="fullname"
          addition={["phone", "job_title"]}
          callBackClick={this.testfunction}
        />
        <div style={{ backgroundColor: "yellow", height: "500px" }}></div>
      </div>
    );
  }
}
