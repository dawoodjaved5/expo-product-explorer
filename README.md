# Expo Product Explorer

A mobile-first Expo product catalog created for the Software for Mobile Devices Git, GitHub Actions, and Expo MCP activity.

**Student:** Muhammad Dawood Javed  
**Roll number:** 23i-3038

## Features

- Search products by name, brand, or description.
- Filter products by category.
- Add and remove favorites with a live saved counter.
- Accessible labels and selected/checked states for interactive controls.
- Safe-area-aware layout for Android and iOS.

## Run locally

```bash
npm install
npx expo start
```

Scan the terminal QR code with Expo Go, or press `a`/`i` to open an available Android/iOS emulator.

## Quality checks

```bash
npm run lint
npx expo-doctor
```

The GitHub Actions workflow runs `npm ci`, `npm run lint`, and `npx expo-doctor` for pushes and pull requests targeting `main`.

## Expo MCP evidence

The official Expo MCP server is registered in Codex at `https://mcp.expo.dev/mcp`. Codex used its `search_documentation` and `read_documentation` tools to inspect this SDK 57 project and recommend:

- a core React Native `FlatList` with stable keys and `extraData`;
- memoized search and category filtering;
- accessible category and favorite controls;
- `react-native-safe-area-context` for device insets.

Those recommendations are implemented in `App.js` and `components/ProductCard.js`.

## Branch workflow

Development is performed on `feature/products` and integrated into `main` through a pull request after the Expo CI checks pass.
