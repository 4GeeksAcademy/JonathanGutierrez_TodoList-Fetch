import React from "react";
import TasksApi from "./TasksApi";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  return (
    <div className="container">
      <TasksApi />
    </div>
  );
};

export default Home;
