# SpriteAI Troubleshooting Guide

This guide addresses common issues users might encounter when using SpriteAI and provides solutions for problems related to installation, sprite generation, and integration with game engines.

## Installation Issues

### 1. Dependency Installation Failures

**Problem:** Unable to install required dependencies.

**Solution:**
- Ensure you have Node.js version 14 or higher installed.
- Try clearing your npm cache: `npm cache clean --force`
- Run `npm install` with the `--legacy-peer-deps` flag: `npm install --legacy-peer-deps`

### 2. Version Compatibility

**Problem:** Conflicts between package versions.

**Solution:**
- Check the `package.json` file for the correct versions of dependencies.
- Update to the latest version of SpriteAI: `npm update spriteai`

## Sprite Generation Issues

### 1. API Key Configuration

**Problem:** Unable to generate sprites due to API key issues.

**Solution:**
- Ensure you have set up your OpenAI API key correctly in your environment variables.
- Double-check that the API key has the necessary permissions for image generation.

### 2. Image Quality Problems

**Problem:** Generated sprites have low quality or unexpected artifacts.

**Solution:**
- Try increasing the `size` option in the generation function (e.g., '2048x2048').
- Adjust the `style` parameter to better match your desired output.
- Experiment with different prompts to get more accurate results.

### 3. Background Removal Failures

**Problem:** Background removal doesn't work as expected.

**Solution:**
- Ensure the `removeBackgroundColor` function is being called with the correct parameters.
- Adjust the `colorThreshold` value to fine-tune the background removal sensitivity.
- Make sure the input image has a clear, consistent background color.

## Game Engine Integration Issues

### 1. Spritesheet Format Incompatibility

**Problem:** Generated spritesheets are not compatible with your game engine.

**Solution:**
- Check if your game engine requires a specific spritesheet format.
- Use the metadata provided by SpriteAI to correctly slice and implement the spritesheet in your game.
- Consider writing a custom parser to convert SpriteAI's output to your required format.

### 2. Animation State Misalignment

**Problem:** Animation states don't align correctly in the game engine.

**Solution:**
- Verify that you're using the correct `frameData` from the SpriteAI metadata.
- Ensure your game engine's animation system is configured to match the spritesheet's layout.
- Double-check the `framesPerState` and `states` parameters used during generation.

### 3. Performance Issues

**Problem:** Large sprite files causing performance problems in-game.

**Solution:**
- Generate sprites at a lower resolution and scale them up in your game engine if needed.
- Use texture atlasing techniques to optimize sprite rendering.
- Consider breaking large spritesheets into smaller, more manageable chunks.

## General Troubleshooting Tips

1. Check the console for any error messages and search for them in the SpriteAI documentation or community forums.
2. Ensure you're using the latest version of SpriteAI and all its dependencies.
3. Try regenerating sprites with different parameters to isolate the issue.
4. If problems persist, reach out to the SpriteAI community or support channels for assistance.