class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Загрузка минимальных ассетов
    this.load.image('hex', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA2NCA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDBMNjQgMTRWMzJMMzIgNDZMMCAzMlYxNEwzMiAwWiIgZmlsbD0iIzJhMmEyYSIgc3Ryb2tlPSIjNDQ0IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+');

    // Плейсхолдеры для кристаллидов
    this.load.image('crystal_lava', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjAiIGZpbGw9IiNmZjZiNmIiIHN0cm9rZT0iI2NjMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMiAyMEMyMCAyMCAyNCAxMiAyNCAxMkMyNCAxMiAyOCAyMCAzNiAyMEMzMCAyOCAyNCAzMiAyNCAzMkMyNCAzMiAxOCAyOCAxMiAyMFoiIGZpbGw9IiNmZmNjMDAiLz4KPC9zdmc+');
    this.load.image('crystal_ice', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjAiIGZpbGw9IiM0ZDk2ZmYiIHN0cm9rZT0iIzAwNWZiZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0yNCAxNEwxOCAyMEwyNCAyNkwzMCAyMEwyNCAxNFoiIGZpbGw9IiNmZmZmZmYiLz4KPHBhdGggZD0iTTE0IDI0TDIwIDE4TDI2IDI0TDIwIDMwTDE0IDI0WiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4=');
    this.load.image('crystal_storm', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjAiIGZpbGw9IiM5ZDRlZGQiIHN0cm9rZT0iIzZjMDBjYyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0yOCAxOEwxOCAyOEgyNkwzMCAyMkwyOCAxOFoiIGZpbGw9IiNmZmZmMDAiLz4KPC9zdmc+');

    this.load.image('enemy', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjAiIGZpbGw9IiM3NTc1NzUiIHN0cm9rZT0iIzQ0NCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xNCAxNEwzNCAzNE0zNCAxNEwxNCAzNCIgc3Ryb2tlPSIjZmYwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPC9zdmc+');

    this.load.image('healthbar', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjMzMzIi8+Cjwvc3ZnPg==');
    this.load.image('healthfill', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTgiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjU2IiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjMDBmZjAwIi8+Cjwvc3ZnPg==');
  }

  create() {
    console.log('BootScene loaded');
    this.scene.start('GameScene');
  }
}

export default BootScene;