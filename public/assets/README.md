# Assets Directory

This directory contains static art assets used throughout the Galudon Character Calculator application.

## Directory Structure

```
public/assets/
├── icons/          # Favicon and app icons
├── images/         # General images and graphics
└── logos/          # Logo variations
```

## Usage

Files in this directory are served as static assets. Reference them in your code using absolute paths:

```jsx
// In HTML
<link rel="icon" href="/assets/icons/favicon.ico" />

// In React/JSX
<img src="/assets/images/logo.png" alt="Galudon Logo" />

// In CSS
background-image: url('/assets/images/background.jpg');
```

## Supported Formats

- **Icons**: .ico, .png, .svg
- **Images**: .png, .jpg, .jpeg, .webp, .svg
- **Graphics**: .svg (recommended for scalable graphics)

## Notes

- Files are copied as-is during build (no processing)
- Use descriptive filenames (e.g., `galudon-logo-gold.svg`)
- Keep file sizes optimized for web use
- SVG is recommended for icons and logos (scalable, small file size)
