# SpriteAI Sprite Generation Guide

This guide provides comprehensive instructions on generating sprites using SpriteAI. Learn how to create basic sprites, add effects, create animations, and customize output for various sprite types.

## Table of Contents

1. [Basic Sprite Generation](#basic-sprite-generation)
2. [Adding Effects](#adding-effects)
3. [Creating Animations](#creating-animations)
4. [Customizing Output](#customizing-output)
5. [Examples](#examples)

## Basic Sprite Generation

To generate a basic sprite using SpriteAI, use the `generateCharacterSpritesheet` function:

```javascript
import { generateCharacterSpritesheet } from 'spriteAI';

const result = await generateCharacterSpritesheet('a medieval knight', {
  size: '512x512',
  style: 'pixel-art'
});
```

This will generate a character spritesheet with default animation states (idle, walk, run, attack).

## Adding Effects

To add effects to your sprites, you can specify additional options when generating:

```javascript
const result = await generateCharacterSpritesheet('a glowing wizard', {
  style: 'pixel-art',
  effects: ['glow', 'sparkle']
});
```

## Creating Animations

SpriteAI automatically generates animations for character sprites. You can customize the animation states and frames:

```javascript
const result = await generateCharacterSpritesheet('a ninja', {
  states: ['idle', 'run', 'jump', 'throw'],
  framesPerState: 8
});
```

## Customizing Output

Customize your sprite output with various options:

```javascript
const result = await generateCharacterSpritesheet('a robot', {
  size: '1024x1024',
  style: 'vector-art',
  padding: 2,
  direction: 'left',
  save: true
});
```

## Examples

### Character Sprite

```javascript
const knight = await generateCharacterSpritesheet('a medieval knight in armor', {
  states: ['idle', 'walk', 'attack', 'defend'],
  framesPerState: 6,
  style: 'pixel-art'
});
```

### Item Sprite

```javascript
const potion = await generateCharacterSpritesheet('a magical healing potion', {
  states: ['idle', 'use'],
  framesPerState: 4,
  size: '256x256'
});
```

### Landscape Sprite

```javascript
import { generateLandscapeSprite } from 'spriteAI';

const forest = await generateLandscapeSprite('a dense magical forest', {
  size: '2048x1024',
  style: 'pixel-art',
  timeOfDay: 'night',
  weather: 'foggy',
  perspective: 'side-scrolling'
});
```

This guide covers the basics of sprite generation using SpriteAI. Experiment with different options and sprite types to create unique and engaging game assets.