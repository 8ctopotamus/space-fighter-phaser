import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {
  lastFired = 0

  constructor() {
    super('game')
  }

  init() {

  }

  preload() {
    this.load.image('player', '../assets/PNG/Retina/ship_G.png')
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.player = this.physics.add.image(320, 320, 'player')
      .setDepth(1)
      .setScale(0.5)
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
      console.log(this.player.rotation)
      this.physics.velocityFromRotation(this.player.rotation + 1, 10, this.player.body.acceleration)
    } else {
      this.player.setAcceleration(0)
    }

    this.physics.world.wrap(this.player, 5)
  }
}