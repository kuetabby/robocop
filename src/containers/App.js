import React, { useEffect, useCallback } from "react";
import RoboList from "../components/RoboList";
import SearchBox from "../components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import Scroll from "../components/Scroll";
import { setSearchField, requestRobots } from "../actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const robots = useSelector(state => state.requestRobots.robots);
  const isPending = useSelector(state => state.requestRobots.isPending);
  const searchField = useSelector(state => state.searchRobots.searchField);

  useEffect(() => {
    dispatch(requestRobots());
  }, [dispatch]);

  const valueChanger = useCallback(
    e => dispatch(setSearchField(e.target.value)),
    [dispatch]
  );

  const filteredRobot = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  if (isPending) {
    return <h1> Loading </h1>;
  } else {
    return (
      <div className="tc">
        <h1 className="f2"> Robocop </h1>

        <SearchBox searchChange={valueChanger} />

        <Scroll>
          <RoboList robots={filteredRobot} />
        </Scroll>
      </div>
    );
  }
}

export default App;
