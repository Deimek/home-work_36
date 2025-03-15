
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: {},
            winner: null,
        };
    }

    componentDidMount() {
        const storedVotes = localStorage.getItem('emojiVotes');
        if (storedVotes) {
            this.setState({ votes: JSON.parse(storedVotes) })
        }
    }

    emojiVote = (emoji) => {
        const newVotes = { ...this.state.votes };
        newVotes[emoji] = (newVotes[emoji] || 0) + 1;

        this.setState({ votes: newVotes });
        localStorage.setItem("emojiVotes", JSON.stringify(newVotes));
    };

    emojiShowResults = () => {
        const newVotes = this.state.votes;
        let maxVotes = 0;
        let winner = null;


        for (let emoji in newVotes) {
            if (newVotes[emoji] > maxVotes) {
                maxVotes = newVotes[emoji];
                winner = emoji;
            }
        }

        this.setState({ winner });
    };


    emojiReset = () => {
        localStorage.removeItem('emojiVotes');
        this.setState({ votes: {}, winner: null })
    }
    render() {
        return (
            <div>
                <h2>Vote for the best smiley</h2>
                <div>
                    <div key="smiley-1">
                        <span>😀</span>
                        <button onClick={() => this.emojiVote('😀')}>Vote</button>
                        <span>{this.state.votes["😀"] || 0} Votes</span>
                    </div>
                    <div key="smiley-2">
                        <span>😂</span>
                        <button onClick={() => this.emojiVote('😂')}>Vote</button>
                        <span>{this.state.votes["😂"] || 0} Votes</span>
                    </div>
                    <div key="smiley-3">
                        <span>😍</span>
                        <button onClick={() => this.emojiVote('😍')}>Vote</button>
                        <span>{this.state.votes["😍"] || 0} Votes</span>
                    </div>

                    <div key="smiley-4">
                        <span>😎</span>
                        <button onClick={() => this.emojiVote('😎')}>Vote</button>
                        <span>{this.state.votes["😎"] || 0} Votes</span>
                    </div>
                    <div key="smiley-5">
                        <span>🤩</span>
                        <button onClick={() => this.emojiVote('🤩')}>Vote</button>
                        <span>{this.state.votes["🤩"] || 0} Votes</span>
                    </div>
                </div>
                <button onClick={this.emojiShowResults}>Show Results</button>
                <button onClick={this.emojiReset}>reset results</button>
                {this.state.winner && (
                    <h3>Winner: {this.state.winner} ({this.state.votes[this.state.winner]} votes)</h3>
                )}
            </div>
        );
    }
}

export default App;
