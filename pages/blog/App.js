import React, {Fragment} from 'react';
import {Route} from "react-router-dom";

// layouts
import Header from './layouts/Header';
import Footer from './layouts/Footer';

// routes
import Index from './routes/Index';

// modals
import Alert from "./components/Alert";

// providers
import {AlertProvider} from './contexts/alert';


const AppProvider = ({contexts, children}) => contexts.reduce(
    (prev, context) => React.createElement(context, {
        children: prev
    }),
    children
);

function App() {
    return (
        <AppProvider contexts={[
            AlertProvider
        ]}>
            <Alert/>
            <Header/>
            <div id="gjMainWrap" className="App">
                <Route exact path="/" component={Index}/>
                <Footer/>
            </div>
        </AppProvider>
    );
}

export default App;
