import React, { useState } from 'react';

const ScoreBoard = () => {
    const [games, setGames] = useState([]);

    const startGame = (homeTeam, awayTeam) => {
        const newGame = { homeTeam, awayTeam, homeScore: 0, awayScore: 0 };
        setGames([...games, newGame]);
    };

    const finishGame = (homeTeam, awayTeam) => {
        setGames(games.filter(game => game.homeTeam !== homeTeam && game.awayTeam !== awayTeam));
    };

    const updateScore = (homeTeam, awayTeam, homeScore, awayScore) => {
        setGames(games.map(game => {
            if (game.homeTeam === homeTeam && game.awayTeam === awayTeam) {
                return { ...game, homeScore, awayScore };
            } else {
                return game;
            }
        }));
    };

    const getSummary = () => {
        const sortedGames = [...games].sort((a, b) => {
            if ((a.homeScore + a.awayScore) !== (b.homeScore + b.awayScore)) {
                return (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });

        return sortedGames.map((game, index) => (
            <div key={index}>
                {game.homeTeam} {game.homeScore} - {game.awayTeam} {game.awayScore}
            </div>
        ));
    };

    return (
        <div>
            <h1>Football World Cup Score Board</h1>
            <button onClick={() => startGame('Mexico', 'Canada')}>Start game: Mexico vs Canada</button>
            <button onClick={() => finishGame('Mexico', 'Canada')}>Finish game: Mexico vs Canada</button>
            <button onClick={() => updateScore('Mexico', 'Canada', 0, 5)}>Update score: Mexico 0 - Canada 5</button>
            <button onClick={getSummary}>Get summary</button>
            <div>
                {getSummary()}
            </div>
        </div>
    );
};

export default ScoreBoard;