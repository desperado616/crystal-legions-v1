import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import Shop from './components/Shop';
import './styles.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, shop, battle, rewards
  const [essence, setEssence] = useState(10);
  const [selectedCrystals, setSelectedCrystals] = useState([]);
  const [playerCrystals, setPlayerCrystals] = useState([
    { id: 1, name: 'Лавовый Воин', type: 'lava', class: 'warrior', level: 1, hp: 100, atk: 15, def: 10, price: 3 },
    { id: 2, name: 'Ледяной Страж', type: 'ice', class: 'guard', level: 1, hp: 120, atk: 10, def: 15, price: 3 }
  ]);

  const shopCrystals = [
    { id: 1, name: 'Лавовый Воин', type: 'lava', class: 'warrior', price: 3 },
    { id: 2, name: 'Ледяной Страж', type: 'ice', class: 'guard', price: 3 },
    { id: 3, name: 'Грозный Стрелок', type: 'storm', class: 'archer', price: 4 },
    { id: 4, name: 'Каменный Целитель', type: 'stone', class: 'healer', price: 4 },
    { id: 5, name: 'Теневой Инженер', type: 'shadow', class: 'engineer', price: 5 }
  ];

  const buyCrystal = (crystal) => {
    if (essence >= crystal.price && playerCrystals.length < 6) {
      setEssence(prev => prev - crystal.price);
      setPlayerCrystals(prev => [...prev, { ...crystal, id: Date.now(), level: 1 }]);
    }
  };

  const startBattle = () => {
    if (playerCrystals.length >= 1) {
      setGameState('battle');
    }
  };

  const endBattle = (victory) => {
    if (victory) {
      setEssence(prev => prev + 5);
    }
    setGameState('rewards');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚔️ CRYSTAL LEGIONS</h1>
        <div className="currency">Эссенция: {essence} 💎</div>
      </header>

      <div className="game-container">
        {gameState === 'menu' && (
          <div className="menu">
            <h2>Тактическая Авто-Батлер</h2>
            <button onClick={() => setGameState('shop')}>Начать игру</button>
            <button onClick={() => setGameState('shop')}>Кампания</button>
            <button disabled>Арена (скоро)</button>
            <button disabled>Гильдии (скоро)</button>
            <div className="info">
              <p>Собери отряд из 6 Кристаллидов и сражайся на гексагональном поле!</p>
              <p>Философия: <strong>Мастерство > Кошелёк</strong></p>
            </div>
          </div>
        )}

        {gameState === 'shop' && (
          <div className="shop-phase">
            <h2>Фаза Подготовки</h2>
            <Shop
              crystals={shopCrystals}
              playerCrystals={playerCrystals}
              essence={essence}
              onBuy={buyCrystal}
              onStartBattle={startBattle}
            />
            <div className="synergy-hint">
              💡 Синергия: 2+ кристаллидов одного типа дают бонус!
            </div>
          </div>
        )}

        {gameState === 'battle' && (
          <div className="battle-phase">
            <h2>Бой</h2>
            <Game
              playerCrystals={playerCrystals}
              onBattleEnd={endBattle}
            />
          </div>
        )}

        {gameState === 'rewards' && (
          <div className="rewards-phase">
            <h2>🎉 Победа!</h2>
            <div className="rewards">
              <div className="reward-item">+5 Эссенции 💎</div>
              <div className="reward-item">+100 Опыта Командира ⭐</div>
              <div className="reward-item">+1 Осколок Памяти 🔮</div>
            </div>
            <button onClick={() => setGameState('shop')}>Продолжить</button>
            <button onClick={() => setGameState('menu')}>В меню</button>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="nft-demo">
          <button disabled>🔄 Подключить TON кошелёк (NFT демо)</button>
          <small>В финальной версии: NFT-скины дают +15% опыта</small>
        </div>
      </footer>
    </div>
  );
}

export default App;