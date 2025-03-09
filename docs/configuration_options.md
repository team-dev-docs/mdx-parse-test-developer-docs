# Sprite Generation Configuration Options

This document outlines all available configuration options for sprite generation and effects in the spriteAI library.

## Basic Sprite Generation

### generateSprite(description, options)

Generates a basic sprite based on the given description.

Options:
- `size`: Image size (default: "1024x1024")
- `save`: Whether to save the image to disk (default: false)
- `iterations`: Number of variations to generate (default: 1)
- `rotate`: Rotation angle in degrees (default: 0)
- `tint`: Color to tint the sprite (default: null)
- `scale`: Scale factor for the sprite (default: 1.0)
- `generateMetadata`: Whether to generate additional metadata (default: false)

Example:
```javascript
sprite.generateSprite("A cute cat", {
  size: "512x512",
  save: true,
  rotate: 45,
  tint: "#FF0000",
  scale: 1.5,
  generateMetadata: true
});
```

## Specialized Sprite Generation

### generatePixelArt(description, options)

Generates a pixel art sprite.

Options:
- Same as `generateSprite`

### generateIsometric(description, options)

Generates an isometric sprite.

Options:
- Same as `generateSprite`

### generateAnimatedEmoji(description, options)

Generates a 4-frame animated emoji.

Options:
- Same as `generateSprite`

### generateRetroConsole(description, consoleType, options)

Generates a sprite in the style of a specific retro console.

Additional Options:
- `consoleType`: Type of retro console (e.g. "genesis", "msx", "commodore64")

## Effects and Variations

### addOutline(description, outlineOptions, options)

Adds an outline to a sprite.

outlineOptions:
- `color`: Outline color (default: black)
- `thickness`: Outline thickness (default: 1)

### createGlitchArt(description, glitchOptions, options)

Creates a glitch art effect on a sprite.

glitchOptions:
- `sortMode`: Pixel sorting mode (default: "brightness")
- `noiseAmount`: Amount of noise to add (default: 10)

### optimizePalette(description, maxColors, options)

Optimizes the color palette of a sprite.

- `maxColors`: Maximum number of colors in the palette (default: 16)

### addShadow(description, shadowOptions, options)

Adds a shadow effect to a sprite.

shadowOptions:
- `opacity`: Shadow opacity (default: 0.5)
- `blur`: Shadow blur amount (default: 3)
- `offsetX`: Shadow X offset (default: 5)
- `offsetY`: Shadow Y offset (default: 5)
- `color`: Shadow color (default: black)

### createMirrorSprite(description, direction, options)

Creates a mirrored version of a sprite.

- `direction`: Mirror direction ("horizontal" or "vertical")
- `fade`: Whether to fade the mirrored part (default: true)

### addWaveEffect(description, waveOptions, options)

Adds a wave distortion effect to a sprite.

waveOptions:
- `intensity`: Wave intensity (default: 30)
- `frequency`: Wave frequency (default: 0.1)
- `animationFrames`: Number of animation frames (default: 8)

### addPixelationEffect(description, pixelationOptions, options)

Adds a pixelation effect to a sprite.

pixelationOptions:
- `pixelSize`: Size of pixelation blocks (default: 8)
- `preserveAlpha`: Whether to preserve alpha channel (default: true)
- `mode`: Pixelation mode ("average" or "dominant")

### addWeatherEffect(description, weatherOptions, options)

Adds a weather effect to a sprite.

weatherOptions:
- `type`: Weather type ("rain", "snow", "fog", "storm", "sandstorm")
- `intensity`: Effect intensity (0-1, default: 0.5)
- `frames`: Number of animation frames (default: 10)
- `speed`: Animation speed (default: 1.0)
- `tint`: Optional color tint for the weather
- `particleSize`: Size of weather particles (default: 2)

## Advanced Generation

### generateCharacterSpritesheet(description, options)

Generates a full character spritesheet with multiple animation states.

Options:
- `states`: Array of animation states (default: ['idle', 'walk', 'run', 'attack'])
- `framesPerState`: Number of frames per animation state (default: 6)
- `size`: Output size (default: "1024x1024")
- `style`: Art style (default: "pixel-art")
- `padding`: Padding between sprites (default: 1)
- `direction`: Base direction of character (default: "right")
- `save`: Whether to save the spritesheet to disk (default: false)

Example:
```javascript
sprite.generateCharacterSpritesheet("A medieval knight", {
  states: ['idle', 'walk', 'attack', 'defend'],
  framesPerState: 8,
  size: "2048x2048",
  style: "pixel-art",
  padding: 2,
  direction: "left",
  save: true
});
```

This will generate a comprehensive spritesheet with multiple animation states for a medieval knight character.