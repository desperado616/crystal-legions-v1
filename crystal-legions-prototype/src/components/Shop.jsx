import React from 'react';

function Shop({ crystals, playerCrystals, essence, onBuy, onStartBattle }) {
  const elementColors = {
    lava: '#ff6b6b',
    ice: '#4d96ff',
    storm: '#9d4edd',
    stone: '#a8a8a8',
    shadow: '#5a189a'
  };

  const classIcons = {
    warrior: '⚔️',
    guard: '🛡️',
    archer: '🏹',
    healer: '💚',
    engineer: '⚙️'
  };

  return (
    <div className="shop-container">
      <div className="shop-section">
        <h3>Магазин Кристаллидов</h3>
        <div className="crystals-grid">
          {crystals.map(crystal => (
            <div
              key={crystal.id}
              className="crystal-card"
              onClick={() => onBuy(crystal)}
              style={{ borderColor: elementColors[crystal.type] }}
            >
              <div className="crystal-header" style={{ backgroundColor: elementColors[crystal.type] }}>
                <span>{classIcons[crystal.class]}</span>
                <span className="crystal-price">{crystal.price}💎</span>
              </div>
              <div className="crystal-name">{crystal.name}</div>
              <div className="crystal-type" style={{ color: elementColors[crystal.type] }}>
                {crystal.type.toUpperCase()}
              </div>
              <div className="crystal-class">{crystal.class}</div>
              <button
                className="buy-btn"
                disabled={essence < crystal.price || playerCrystals.length >= 6}
              >
                Купить
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="player-section">
        <h3>Ваш отряд ({playerCrystals.length}/6)</h3>
        <div className="player-crystals">
          {playerCrystals.map((crystal, index) => (
            <div
              key={crystal.id || index}
              className="player-crystal"
              style={{ borderColor: elementColors[crystal.type] }}
            >
              <div className="crystal-icon">{classIcons[crystal.class]}</div>
              <div className="crystal-info">
                <div>{crystal.name}</div>
                <div style={{ color: elementColors[crystal.type] }}>Ур. {crystal.level}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="battle-controls">
          <button
            onClick={onStartBattle}
            disabled={playerCrystals.length === 0}
            className="start-battle-btn"
          >
            🚀 Начать бой
          </button>
          <div className="hint">Расставьте кристаллидов на поле перед боем</div>
        </div>
      </div>
    </div>
  );
}

export default Shop;