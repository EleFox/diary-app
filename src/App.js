import React, {Component} from 'react';
import DiaryView from './view/DiaryView/DiaryView';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppHeader/>
                <DiaryView/>
            </div>
        );
    }
}

function AppHeader() {
    return (
        <header className="app-header">
            <div className="main-container">
                <ul className="nav-list">
                    <li>首页</li>
                    <li className="active">日记</li>
                </ul>
            </div>
        </header>
    );
}

export default App;
