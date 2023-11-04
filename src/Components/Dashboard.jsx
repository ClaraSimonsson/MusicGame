import DemoPlayer from "./DemoPlayer";

function Dashboard(props) {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Which year was this song released?</h1>
                <h2>If you succeed, what is the name of the title and artist?</h2>
                <DemoPlayer></DemoPlayer>
            </header>
        </div>
    );
}

export default Dashboard