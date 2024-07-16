import { createRoot } from "react-dom/client";
import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function App() {
  return (
    <Router basename="/test-react-router-dom">
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
      A <Switch> looks through all its children <Route>
      elements and renders the first one whose path
      matches the current URL. Use a <Switch> any time
      you have multiple routes, but you want only one
      of them to render at a time
    */}
        <Switch>
          <Route exact={false} path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Home() {
  const history = useHistory();
  const [c, setC] = React.useState(0);
  return (
    <div>
      <h2>Home</h2>
      <button
        onClick={() => {
          history.push("/about");
          setC(c + 1);
        }}
      >
        gonext
      </button>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
