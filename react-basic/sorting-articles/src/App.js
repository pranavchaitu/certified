import React, { useState } from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({articles}) {
    const [toggle,setToggle] = useState(true)

    function sortedByVote() {
        return articles.sort((a,b) => b.upvotes - a.upvotes)
    }

    function sortedByDate() {
        return articles.sort((a,b) => a.date > b.date ? -1 : b.date > a.date ? 1 : 0)
    }

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button onClick={() => setToggle(true)} data-testid="most-upvoted-link" className="small">Most Upvoted</button>
                <button onClick={() => setToggle(false)} data-testid="most-recent-link" className="small">Most Recent</button>
            </div>
            <Articles articles={toggle ? sortedByVote() : sortedByDate() }/>
        </div>
    );

}

export default App;
