import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {
  lastFired = 0

  constructor() {
    super('game')
  }

  preload() {
    this.load.image('background', '../../assets/images/space/nebula.jpg');
    this.load.image('stars', '../../assets/images/space/stars.png');
    this.load.atlas('space', '../../assets/images/space/space.png', 'assets/tests/space/space.json');
    this.load.image('player', '../../assets/images/Retina/ship_G.png')
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, window.innerWidth * 2, window.innerHeight * 2, 'background')
    .setScrollFactor(0);
    this.stars = this.add.tileSprite(0, 0,window.innerWidth * 2, window.innerHeight * 2,'stars')

    this.cursors = this.input.keyboard.createCursorKeys()
    this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.player = this.physics.add.image(320, 320, 'player')
      .setDepth(1)
      .setScale(0.5)
      .setMaxVelocity(600)
      .setAngularDrag(400)
      .setDrag(100)

    this.cameras.main.startFollow(this.player)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-300)
    } else if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(300)
    } else {
      this.player.setAngularVelocity(0)
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, 600, this.player.body.acceleration)
    } else {
      this.player.setAcceleration(0)
    }

    this.physics.world.wrap(this.player, 5)
  }
}