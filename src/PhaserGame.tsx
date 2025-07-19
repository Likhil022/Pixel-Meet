import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { useUser } from "@clerk/clerk-react";

const PhaserGame = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!gameRef.current || !user) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      pixelArt: true,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: "100%",
        height: "100%",
      },
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
    // eslint-disable-next-line prefer-const
    let otherAvatars: Phaser.GameObjects.Sprite[] = [];

    // 🧠 Replace this with real backend/users later
    const dummyPlayers = [
      {
        id: "u1",
        name: "Alice",
        x: 500,
        y: 300,
        direction: "down",
        room: "room-1",
      },
      {
        id: "u2",
        name: "Bob",
        x: 600,
        y: 320,
        direction: "left",
        room: "room-2",
      },
      {
        id: "u3",
        name: "Charlie",
        x: 700,
        y: 250,
        direction: "right",
        room: "room-1",
      },
    ];

    // Simulate current room of logged-in user
    const currentRoom = "room-1"; // You can manage this via state/store later
    const playerName = user.username || user.firstName || "Guest";

    function preload(this: Phaser.Scene) {
      this.load.image("tiles", "/assets/tileset/tiles.png");
      this.load.tilemapTiledJSON("map", "/assets/maps/demo.json");

      this.load.image("looking-up", "/assets/Avatars/lookingUp.png");
      this.load.image("looking-down", "/assets/Avatars/lookingDown.png");
      this.load.image("looking-left", "/assets/Avatars/lookingLeft.png");
      this.load.image("looking-right", "/assets/Avatars/lookingRight.png");

      this.load.image("walking-up", "/assets/Avatars/walkingUp.png");
      this.load.image("walking-down", "/assets/Avatars/walkingDown.png");
      this.load.image("walking-left", "/assets/Avatars/walkingLeft.png");
      this.load.image("walking-right", "/assets/Avatars/walkingRight.png");
    }

    function create(this: Phaser.Scene) {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 16,
        tileHeight: 16,
      });

      const tileset = map.addTilesetImage("town", "tiles");

      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      const groundLayer = map.createLayer("Ground", tileset!, 0, 0);
      const decorationLayer = map.createLayer("Border", tileset!, 0, 0);
      const treesLayer = map.createLayer("Trees", tileset!, 0, 0);

      groundLayer?.setCollisionByProperty({ collides: true });
      decorationLayer?.setCollisionByProperty({ collides: true });
      treesLayer?.setCollisionByProperty({ collides: true });

      // Main player (YOU)
      player = this.physics.add
        .sprite(400, 300, "looking-down")
        .setScale(0.4)
        .setCollideWorldBounds(true);

      cursors = this.input.keyboard!.createCursorKeys();

      if (treesLayer) {
        this.physics.add.collider(player, treesLayer);
      }

      const nameText = this.add
        .text(player.x, player.y - 30, playerName, {
          font: "12px Inter",
          color: "#000000",
          backgroundColor: "#ffffffcc",
          padding: {
            left: 6,
            right: 6,
            top: 2,
            bottom: 2,
          },
        })
        .setOrigin(0.5)
        .setDepth(1)
        .setScrollFactor(1);
      player.setData("nameText", nameText);

      // Show ONLY users in same room
      dummyPlayers
        .filter((user) => user.room === currentRoom)
        .forEach((user) => {
          const avatar = this.add
            .sprite(user.x, user.y, `looking-${user.direction}`)
            .setScale(0.4);

          const otherName = this.add
            .text(user.x, user.y - 30, user.name, {
              font: "12px Poppins",
              color: "#000",
              backgroundColor: "#ffffffcc",
              padding: {
                left: 6,
                right: 6,
                top: 2,
                bottom: 2,
              },
            })
            .setOrigin(0.5)
            .setDepth(1);

          avatar.setData("nameText", otherName);
          otherAvatars.push(avatar);
        });
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

      const desiredTexture = moving
        ? `walking-${currentDirection}`
        : `looking-${currentDirection}`;

      this.cameras.main.startFollow(player, true, 0.1, 0.1);
      this.cameras.main.setZoom(2);

      if (player.texture.key !== desiredTexture) {
        player.setTexture(desiredTexture);
      }

      const nameText = player.getData("nameText") as Phaser.GameObjects.Text;
      if (nameText) {
        nameText.setPosition(player.x, player.y - 30);
      }

      otherAvatars.forEach((avatar) => {
        const otherName = avatar.getData("nameText") as Phaser.GameObjects.Text;
        if (otherName) {
          otherName.setPosition(avatar.x, avatar.y - 30);
        }
      });
    }

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, [user]);

  return <div ref={gameRef} />;
};

export default PhaserGame;
