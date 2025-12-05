class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.add.text(400, 300, 'Игровая сцена', {
      fontSize: '32px',
      fill: '#fff'
    }).setOrigin(0.5);
    
    // Просто демо-сцена, можно нажать для перехода к бою
    const startBtn = this.add.text(400, 400, 'Начать демо-бой', {
      fontSize: '24px',
      fill: '#4d96ff',
      backgroundColor: '#222',
      padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5)
    .setInteractive();
    
    startBtn.on('pointerdown', () => {
      this.scene.start('BattleScene');
    });
  }
}

export default GameScene;