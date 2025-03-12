# Getting Started with SpriteAI

Welcome to SpriteAI! This guide will help you get up and running quickly with our AI-powered sprite generation tool.

## Installation

1. Ensure you have Node.js installed on your system (version 12 or higher recommended).

2. Install SpriteAI using npm:

```
npm install spriteai
```

3. Make sure you have an OpenAI API key. You'll need to set this as an environment variable:

```
export OPENAI_API_KEY=your_api_key_here
```

## Basic Usage

Here's a simple example to generate a character spritesheet:

```javascript
import { generateCharacterSpritesheet } from 'spriteai';

async function generateSprite() {
  const result = await generateCharacterSpritesheet('a cute robot', {
    states: ['idle', 'walk', 'run'],
    framesPerState: 4,
    size: '512x512',
    save: true
  });
  
  console.log(result.spritesheet); // Base64 encoded spritesheet
  console.log(result.metadata); // Metadata about the generated spritesheet
}

generateSprite();
```

And here's how to generate a landscape sprite:

```javascript
import { generateLandscapeSprite } from 'spriteai';

async function generateLandscape() {
  const result = await generateLandscapeSprite('a lush forest with a river', {
    size: '1024x512',
    style: 'pixel-art',
    timeOfDay: 'sunset',
    weather: 'clear',
    save: true
  });
  
  console.log(result.landscape); // Base64 encoded landscape image
  console.log(result.metadata); // Metadata about the generated landscape
}

generateLandscape();
```

## Main Features

1. **Character Spritesheet Generation**: Create animated character spritesheets with customizable states, frames, and styles.

2. **Landscape Sprite Generation**: Generate detailed landscape sprites for game backgrounds with various environmental settings.

3. **Customization Options**: Adjust size, style, time of day, weather, and more for both character and landscape sprites.

4. **Background Removal**: Option to remove white backgrounds from generated sprites (especially useful for landscapes).

5. **Metadata**: Receive detailed metadata about generated sprites, including animation states, frame data, and dimensions.

6. **Local Saving**: Option to automatically save generated sprites to your local filesystem.

## Next Steps

- Explore the various options available for both `generateCharacterSpritesheet` and `generateLandscapeSprite` functions.
- Experiment with different prompts and settings to achieve your desired sprite results.
- Check out our API documentation for more advanced usage and integration tips.

Happy sprite generating!