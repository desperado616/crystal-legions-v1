import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import GameScene from '../scenes/GameScene';
import BattleScene from '../scenes/BattleScene';

function Game({ playerCrystals, onBattleEnd }) {
  const gameRef = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      scene: [BootScene, GameScene, BattleScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      }
    };

    gameInstance.current = new Phaser.Game(config);

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
      }
    };
  }, []);

  useEffect(() => {
    if (gameInstance.current && playerCrystals.length > 0) {
      // Передаем данные кристаллидов в сцену
      const scene = gameInstance.current.scene.getScene('BattleScene');
      if (scene && scene.scene.key === 'BattleScene') {
        scene.startBattle(playerCrystals);
      }
    }
  }, [playerCrystals]);

  return <div ref={gameRef} style={{ width: '100%', height: '600px' }} />;
}

export default Game;