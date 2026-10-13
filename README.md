# Sathvika Portfolio — Flutter/Dart Web

This project recreates the supplied Gatla Sathvika portfolio as a Flutter web application. The Flutter entrypoint mounts the faithful portfolio experience in a web `HtmlElementView`, preserving the original layout, typography, responsive behavior, image, links, login flow, and achievement carousel.

## Run locally

```bash
flutter pub get
flutter run -d chrome
```

## Build for web

```bash
flutter build web --release
```

The compiled site is written to `build/web`.

## Managed preview helper

```bash
python3 server.py
```

The helper serves `build/web` when a Flutter build exists, or the source `web` assets before a build. The supplied profile image is at `web/sath.jpeg`.
