import "./App.scss";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import UserLayout from "./layout/UserLayout";
import UserPage from "./pages/User";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <UserLayout path="/" component={UserPage} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
