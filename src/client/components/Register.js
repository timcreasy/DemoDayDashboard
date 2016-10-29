import React from "react";
import NewRegistration from "./NewRegistration";
import InvalidRegistration from "./InvalidRegistration";
import Spinner from "./Spinner";

const Register = React.createClass({

  getInitialState() {
    return({
      isRegistered: false, 
      correctComponent: <Spinner />
    })
  },

  componentWillMount() {
    // axios.get('http://localhost:3000/api/' + this.props.params.beaconId)
    //   .then(({data: {msg}}) => {
    //     if (msg === "Invalid") {
    //       this.setState({correctComponent: <InvalidRegistration />})
    //     } else {
    //       this.setState({correctComponent: <NewRegistration beacon={this.props.params.beaconId} />});
    //     }
    //   })
    //   .catch(console.log);

    this.setState({correctComponent: <NewRegistration beacon={this.props.params.beaconId} />});

  },

  render: function() {
    return (
      <div>
        {this.state.correctComponent}
      </div>
    );
  }
});

module.exports = Register;