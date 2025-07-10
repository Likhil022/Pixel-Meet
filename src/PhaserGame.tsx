import { useEffect, useRef } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#d0f0c0",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
      parent: gameRef.current,
    };

    let player: Phaser.Physics.Arcade.Sprite;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    let currentDirection: "up" | "down" | "left" | "right" = "down";
    let moving = false;

    function preload(this: Phaser.Scene) {
      this.load.image("looking-up", "assets/Avatars/lookingUp.png");
      this.load.image("looking-down", "assets/Avatars/lookingDown.png");
      this.load.image("looking-left", "assets/Avatars/lookingLeft.png");
      this.load.image("looking-right", "assets/Avatars/lookingRight.png");

      this.load.image("walking-up", "assets/Avatars/walkingUp.png");
      this.load.image("walking-down", "assets/Avatars/walkingDown.png");
      this.load.image("walking-left", "assets/Avatars/walkingLeft.png");
      this.load.image("walking-right", "assets/Avatars/walkingRight.png");
    }

    function create(this: Phaser.Scene) {
      player = this.physics.add
        .sprite(400, 300, "looking-down")
        .setScale(0.5)
        .setCollideWorldBounds(true);

      cursors = this.input.keyboard!.createCursorKeys();
    }

    function update(this: Phaser.Scene) {
      const speed = 150;
      moving = false;

      player.setVelocity(0);

      if (cursors.left?.isDown || this.input.keyboard?.addKey("A").isDown) {
        player.setVelocityX(-speed);
        currentDirection = "left";
        moving = true;
      } else if (
        cursors.right?.isDown ||
        this.input.keyboard?.addKey("D").isDown
      ) {
        player.setVelocityX(speed);
        currentDirection = "right";
        moving = true;
      }

      if (cursors.up?.isDown || this.input.keyboard?.addKey("W").isDown) {
        player.setVelocityY(-speed);
        currentDirection = "up";
        moving = true;
      } else if (
        cursors.down?.isDown ||
        this.input.keyboard?.addKey("S").isDown
      ) {
        player.setVelocityY(speed);
        currentDirection = "down";
        moving = true;
      }

      // Texture switching based on state
      const desiredTexture = moving
        ? `walking-${currentDirection}`
        : `looking-${currentDirection}`;

      if (player.texture.key !== desiredTexture) {
        player.setTexture(desiredTexture);
      }
    }

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
};

export default PhaserGame;
