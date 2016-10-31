import React from "react";

const InvalidRegistration = React.createClass({

  render: function() {

    return (
      <div className="mainView">
        <h1>Invalid beacon</h1>
        <div className="center">
          <a href="mailto:tim@timcreasy.com" className="btn btn-primary">Contact Webmaster</a>
        </div>
      </div>
    );
  }
});

module.exports = InvalidRegistration;