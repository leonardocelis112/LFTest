import React from "react";
import "./App.css";
import ApplicationForm from "./ApplicationForm/ApplicationForm";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <ApplicationForm></ApplicationForm>
      </div>
    </React.Fragment>
  );
}

export default App;
