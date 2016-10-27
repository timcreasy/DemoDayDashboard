import React from "react";

const Spinner = React.createClass({

  render: function() {

    return (
      <div className="spinnerContainer">
        <span className="glyphicon glyphicon-refresh spinner"></span>
      </div>
    );
  }
});

module.exports = Spinner;