import { useEffect, useRef } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      pixelArt: true,
      width: 1024,
      height: 510,
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
      this.load.image("tiles", "assets/tileset/tiles.png");
      this.load.tilemapTiledJSON("map", "assets/maps/demo.json");

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
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 16,
        tileHeight: 16,
      });

      console.log("Loaded map:", map);
      console.log("Tilesets:", map.tilesets);
      console.log("Layer names:", map.getTileLayerNames());

      const tileset = map.addTilesetImage("town", "tiles");
      console.log("Tileset used:", tileset);

      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      // Render layers (you can rename "Tile Layer 1" to whatever your layer is)
      let groundLayer, decorationLayer, treesLayer;
      if (tileset) {
        groundLayer = map.createLayer("Ground", tileset, 0, 0);
        decorationLayer = map.createLayer("Border", tileset, 0, 0);
        treesLayer = map.createLayer("Trees", tileset, 0, 0);
        if (treesLayer) {
          treesLayer.setCollisionByProperty({ collides: true });
        }
      } else {
        console.error("Tileset is null, cannot create layers.");
      }

      player = this.physics.add
        .sprite(400, 300, "looking-down")
        .setScale(0.4)
        .setCollideWorldBounds(true);

      cursors = this.input.keyboard!.createCursorKeys();
      if (treesLayer) {
        this.physics.add.collider(player, treesLayer);
      }
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

      this.cameras.main.startFollow(player, true, 0.1, 0.1);

      this.cameras.main.setZoom(2);

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
//commiting to update PhaserGamer.tsx

export default PhaserGame;
