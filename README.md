# MyCoaster App

_Track. Explore. Live the Ride._

MyCoaster App is a React Native experience for roller-coaster enthusiasts who want to explore nearby parks, discover standout coasters, and learn more about the surrounding attractions.

## Folder Structure

```
src/
  navigation/        # Navigators shared across the app
  features/          # Feature-based modules (parks, coasters, map, favorites, profile)
  components/        # Reusable UI building blocks
  services/          # API, location, and storage helpers
  store/             # Global state management hooks
  theme/             # Design tokens (colors, spacing, typography)
  utils/             # Cross-cutting utilities
  assets/data/       # Local JSON datasets for parks and coasters
```

## Run the Project

1. Install dependencies: `yarn install`.
2. Start the Metro server: `yarn start`.
3. Android: keep an emulator/device running, then `yarn run android`.
4. iOS: open an iOS simulator or connect a device, then `yarn run ios`.

## Development Workflow

- Use `develop` as the main branch for day-to-day collaboration.
- Follow commit prefixes `feat/`, `fix/`, and `chore/` to keep history easy to scan.
