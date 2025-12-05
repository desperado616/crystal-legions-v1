class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
    this.playerCrystals = [];
    this.enemyCrystals = [];
    this.battleActive = false;
  }

  create() {
    // Создаем гексагональное поле 8x8
    this.createHexGrid(8, 8);

    // Создаем UI для боя
    this.createBattleUI();

    // Кнопка для демо
    const demoButton = this.add.text(650, 30, '▶️ Запустить бой', {
      fontSize: '16px',
      fill: '#fff',
      backgroundColor: '#4CAF50',
      padding: { x: 10, y: 5 }
    })
    .setInteractive()
    .on('pointerdown', () => this.startBattle(this.playerCrystals));
  }

  createHexGrid(rows, cols) {
    const hexRadius = 32;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const hexWidth = 2 * hexRadius;

    this.hexGroup = this.add.group();

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Смещение для гексагональной сетки
        const x = col * hexWidth * 0.75 + 100;
        const y = row * hexHeight + (col % 2) * hexHeight / 2 + 100;

        const hex = this.add.image(x, y, 'hex')
          .setAlpha(0.5)
          .setInteractive();

        hex.row = row;
        hex.col = col;

        // Цвет в зависимости от стороны поля
        if (row < 4) {
          hex.setTint(0x4444ff); // Синяя сторона игрока
        } else {
          hex.setTint(0xff4444); // Красная сторона врага
        }

        this.hexGroup.add(hex);
      }
    }
  }

  createBattleUI() {
    // Текст с информацией о бое
    this.battleText = this.add.text(400, 30, '⚔️ Бой начнется через 3...', {
      fontSize: '20px',
      fill: '#fff'
    }).setOrigin(0.5);

    // Таймер боя
    this.battleTimer = 180; // 3 минуты
    this.timerText = this.add.text(700, 30, `⏱️ ${this.battleTimer}s`, {
      fontSize: '16px',
      fill: '#fff'
    });
  }

  startBattle(playerCrystals) {
    this.playerCrystals = playerCrystals;
    this.battleActive = true;
    this.battleText.setText('⚔️ Бой начался!');

    // Создаем кристаллидов игрока
    this.createPlayerUnits();

    // Создаем вражеских кристаллидов
    this.createEnemyUnits();

    // Запускаем таймер боя
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Запускаем симуляцию боя
    this.simulateBattle();
  }

  createPlayerUnits() {
    this.playerUnits = [];

    // Простая расстановка для демо
    const positions = [
      { row: 3, col: 2 },
      { row: 3, col: 4 },
      { row: 2, col: 3 }
    ];

    this.playerCrystals.forEach((crystal, index) => {
      if (index < positions.length) {
        const pos = positions[index];
        const hex = this.getHexAt(pos.row, pos.col);

        let texture = 'crystal_lava';
        if (crystal.type === 'ice') texture = 'crystal_ice';
        if (crystal.type === 'storm') texture = 'crystal_storm';

        const unit = this.add.image(hex.x, hex.y, texture)
          .setScale(0.8);

        // Добавляем полоску здоровья
        this.createHealthBar(unit, crystal.hp || 100);

        this.playerUnits.push({
          sprite: unit,
          data: crystal,
          hp: crystal.hp || 100,
          maxHp: crystal.hp || 100,
          hex: pos
        });
      }
    });
  }

  createEnemyUnits() {
    this.enemyUnits = [];

    const enemyTypes = [
      { type: 'shadow', hp: 80, atk: 18 },
      { type: 'stone', hp: 150, atk: 10 },
      { type: 'lava', hp: 90, atk: 20 }
    ];

    const positions = [
      { row: 4, col: 2 },
      { row: 4, col: 4 },
      { row: 5, col: 3 }
    ];

    enemyTypes.forEach((enemy, index) => {
      if (index < positions.length) {
        const pos = positions[index];
        const hex = this.getHexAt(pos.row, pos.col);

        const unit = this.add.image(hex.x, hex.y, 'enemy')
          .setScale(0.8);

        this.createHealthBar(unit, enemy.hp);

        this.enemyUnits.push({
          sprite: unit,
          data: enemy,
          hp: enemy.hp,
          maxHp: enemy.hp,
          hex: pos
        });
      }
    });
  }

  createHealthBar(parent, maxHp) {
    const bar = this.add.image(parent.x, parent.y - 40, 'healthbar');
    const fill = this.add.image(parent.x - 29, parent.y - 40, 'healthfill')
      .setOrigin(0, 0.5)
      .setDisplaySize(58, 6);

    parent.healthBar = { bar, fill, maxHp, currentHp: maxHp };
  }

  updateHealthBar(sprite, newHp) {
    if (sprite.healthBar) {
      const percentage = Math.max(0, newHp / sprite.healthBar.maxHp);
      sprite.healthBar.fill.setDisplaySize(58 * percentage, 6);

      // Меняем цвет при низком здоровье
      if (percentage < 0.3) {
        sprite.healthBar.fill.setTint(0xff0000);
      } else if (percentage < 0.6) {
        sprite.healthBar.fill.setTint(0xffff00);
      }
    }
  }

  getHexAt(row, col) {
    let foundHex = null;
    this.hexGroup.getChildren().forEach(hex => {
      if (hex.row === row && hex.col === col) {
        foundHex = hex;
      }
    });
    return foundHex;
  }

  updateTimer() {
    if (!this.battleActive) return;

    this.battleTimer--;
    this.timerText.setText(`⏱️ ${this.battleTimer}s`);

    if (this.battleTimer <= 0) {
      this.endBattle();
    }
  }

  simulateBattle() {
    // Простая симуляция боя для демо
    this.time.addEvent({
      delay: 1000,
      callback: this.performBattleStep,
      callbackScope: this,
      loop: true
    });
  }

  performBattleStep() {
    if (!this.battleActive) return;

    // Простая логика боя: по очереди атакуют
    this.attackSequence();

    // Проверяем конец боя
    this.checkBattleEnd();
  }

  attackSequence() {
    // Игрок атакует
    this.playerUnits.forEach((unit, index) => {
      if (unit.hp > 0 && this.enemyUnits.length > 0) {
        const targetIndex = index % this.enemyUnits.length;
        const target = this.enemyUnits[targetIndex];

        if (target && target.hp > 0) {
          this.performAttack(unit, target);
        }
      }
    });

    // Враг атакует
    this.enemyUnits.forEach((unit, index) => {
      if (unit.hp > 0 && this.playerUnits.length > 0) {
        const targetIndex = index % this.playerUnits.length;
        const target = this.playerUnits[targetIndex];

        if (target && target.hp > 0) {
          this.performAttack(unit, target, false);
        }
      }
    });
  }

  performAttack(attacker, defender, isPlayer = true) {
    const damage = 10 + Math.floor(Math.random() * 15);
    defender.hp = Math.max(0, defender.hp - damage);

    // Обновляем полоску здоровья
    this.updateHealthBar(defender.sprite, defender.hp);

    // Анимация урона
    this.tweens.add({
      targets: defender.sprite,
      alpha: 0.5,
      duration: 100,
      yoyo: true
    });

    // Текст урона
    const damageText = this.add.text(
      defender.sprite.x,
      defender.sprite.y - 60,
      `-${damage}`,
      {
        fontSize: '20px',
        fill: '#ff5555',
        stroke: '#000',
        strokeThickness: 3
      }
    );

    // Анимация текста урона
    this.tweens.add({
      targets: damageText,
      y: defender.sprite.y - 100,
      alpha: 0,
      duration: 1000,
      onComplete: () => damageText.destroy()
    });

    // Анимация атаки
    this.tweens.add({
      targets: attacker.sprite,
      x: defender.sprite.x,
      y: defender.sprite.y,
      duration: 200,
      yoyo: true,
      ease: 'Power2'
    });
  }

  checkBattleEnd() {
    const playerAlive = this.playerUnits.some(unit => unit.hp > 0);
    const enemyAlive = this.enemyUnits.some(unit => unit.hp > 0);

    if (!playerAlive || !enemyAlive) {
      this.endBattle(playerAlive);
    }
  }

  endBattle(playerWon = true) {
    this.battleActive = false;

    if (playerWon) {
      this.battleText.setText('🎉 Победа!');
      this.showVictoryEffects();
    } else {
      this.battleText.setText('💀 Поражение');
    }

    // Задержка перед переходом к наградам
    this.time.delayedCall(2000, () => {
      // Здесь бы вызвать колбэк для React
      console.log('Battle ended, player won:', playerWon);
    });
  }

  showVictoryEffects() {
    // Эффекты победы
    for (let i = 0; i < 20; i++) {
      const star = this.add.text(
        Math.random() * 800,
        Math.random() * 600,
        '⭐',
        {
          fontSize: '24px'
        }
      );

      this.tweens.add({
        targets: star,
        y: star.y - 100,
        alpha: 0,
        duration: 1000 + Math.random() * 500,
        onComplete: () => star.destroy()
      });
    }
  }
}

export default BattleScene;