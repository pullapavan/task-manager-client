import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAndSignup from './components/LoginAndSignup'
import Tasks from './components/Tasks'
import Admin from './components/Admin'
import NoPageFound from './components/NoPageFound'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import apicalls from './apicalls/apicalls'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";


function App() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    const cacheToken = localStorage.getItem("authToken")
    if (cacheToken && !state.user.email) {
      apicalls.refresh()
        .then(res => {
          console.log(res)
          dispatch({ user: res.data, type: "REFRESH"})
        })
        .catch((error) => {
          dispatch({ type: "CLEAR" })
        })
    }
  },[])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginAndSignup} />
          <Route path="/login" component={LoginAndSignup} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/admin" component={Admin} />
          <Route component={NoPageFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
