import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/context";

import TopBar from "./components/topBar/topBar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Settings from "./pages/settings/settings";
import Single from "./pages/single/single";
import Write from "./pages/write/write";
import About from "./pages/abouts/abouts";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>  
        <Route exact path="/login">{user? <Home/>: <Login/>}</Route>  
        <Route exact path="/about">{user? <About/>: <Login/>}</Route>  
        <Route exact path="/register">{user? <Home/>: <Register/>}</Route>  
        <Route exact path="/write">{user? <Write/>: <Login/>}</Route>  
        <Route exact path="/settings">{user? <Settings/>: <Register/>}</Route>    
        <Route exact path="/post/:postId">
          <Single/>
        </Route>  
      </Switch>  
    </Router>
  );
}

export default App;
