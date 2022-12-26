import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Timeline from "./pages/Timeline";
import store from "./store/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Timeline />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
