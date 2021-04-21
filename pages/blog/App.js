import React, {Fragment} from 'react';

const AppProvider = ({contexts, children}) => contexts.reduce(
    (prev, context) => React.createElement(context, {
        children: prev
    }),
    children
);

function App() {
    return (
        <AppProvider contexts={[]}>
            <div className="App">

            </div>
        </AppProvider>
    );
}

export default App;
