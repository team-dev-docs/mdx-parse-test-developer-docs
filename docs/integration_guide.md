# SpriteAI Integration Guide

This guide provides instructions on how to integrate SpriteAI-generated sprites into popular game development frameworks and engines. We'll cover examples for Phaser, Unity, and other common platforms.

## Table of Contents
1. [Phaser Integration](#phaser-integration)
2. [Unity Integration](#unity-integration)
3. [Other Platforms](#other-platforms)

## Phaser Integration

Phaser is a popular HTML5 game framework. Here's how to integrate SpriteAI-generated sprites into your Phaser project:

1. First, generate your sprite using SpriteAI and save the spritesheet.

2. Load the spritesheet in your Phaser game:

```javascript
function preload() {
  this.load.spritesheet('character', 'path/to/your_spritesheet.png', { 
    frameWidth: 64, 
    frameHeight: 64 
  });
}
```

3. Create animations using the spritesheet:

```javascript
function create() {
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('character', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('character', { start: 6, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  // Create more animations for other states
}
```

4. Use the sprite in your game:

```javascript
function create() {
  // ... previous code ...

  this.player = this.add.sprite(400, 300, 'character');
  this.player.play('idle');
}
```

## Unity Integration

To use SpriteAI-generated sprites in Unity:

1. Generate and save your spritesheet using SpriteAI.

2. Import the spritesheet into your Unity project.

3. Select the imported spritesheet in the Unity Editor.

4. In the Inspector, change the Texture Type to "Sprite (2D and UI)".

5. Set the Sprite Mode to "Multiple" and click on "Sprite Editor".

6. In the Sprite Editor, use the "Slice" menu to automatically slice your spritesheet based on cell size or frame count.

7. Create a new Animation in Unity:
   - Right-click in the Project window
   - Select Create > Animation > Animation Clip
   - Name it (e.g., "CharacterIdle")

8. Open the Animation window and drag the sliced sprites for each animation state into the timeline.

9. Attach an Animator component to your game object and create an Animator Controller.

10. Set up your animation states and transitions in the Animator window.

## Other Platforms

For other game development platforms, the general process remains similar:

1. Generate and save your spritesheet using SpriteAI.

2. Import the spritesheet into your project.

3. Set up the spritesheet according to your platform's specifications (e.g., defining frame dimensions, animation sequences).

4. Create animations using the imported spritesheet.

5. Apply the animations to your game objects or sprites within your game logic.

For specific platforms:

- **Godot**: Use AnimatedSprite node and create SpriteFrames resource from your spritesheet.

- **GameMaker Studio**: Import the spritesheet and use the sprite editor to define subimages for animations.

- **Construct**: Use the Sprite object and set up animations in the Animations Editor.

Remember to adjust frame rates, animation timings, and other properties to suit your game's needs and to match the original intent of the SpriteAI-generated animations.