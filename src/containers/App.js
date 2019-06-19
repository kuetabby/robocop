import React, { useEffect } from "react";
import RoboList from "../components/RoboList";
import SearchBox from "../components/SearchBox";
import { connect } from "react-redux";
import Scroll from "../components/Scroll";
import { setSearchField, requestRobots } from "../actions";
import "./App.css";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error,
    isPending: state.requestRobots.isPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobot: () => dispatch(requestRobots())
  };
};

function App(props) {
  useEffect(() => {
    props.onRequestRobot();
  }, []);

  const { searchField, robots, isPending, onSearchChange } = props;
  const filteredRobot = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  if (isPending) {
    return <h1> Loading </h1>;
  } else {
    return (
      <div className="tc">
        <h1 className="f2"> Robocop </h1>

        <SearchBox searchChange={onSearchChange} />

        <Scroll>
          <RoboList robots={filteredRobot} />
        </Scroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
