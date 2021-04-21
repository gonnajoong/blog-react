import React, {Fragment} from 'react';

// layouts
import Header from './layouts/Header';

const AppProvider = ({contexts, children}) => contexts.reduce(
    (prev, context) => React.createElement(context, {
        children: prev
    }),
    children
);

function App() {
    return (
        <AppProvider contexts={[]}>
            <Header/>
            <div className="App">
            </div>
        </AppProvider>
    );
}

export default App;
