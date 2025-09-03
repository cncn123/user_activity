# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Build**: `npm run build` - TypeScript compilation + Vite build
- **Lint**: `npm run lint` - ESLint with TypeScript support, max 0 warnings
- **Preview**: `npm run preview` - Preview production build

## Project Architecture

This is a React-based bento grid template powered by `react-grid-layout` with TypeScript and Tailwind CSS. The core architecture:

### State Management
- Uses React hooks (`useState`) for tab selection and layout switching
- Main state flows through `App.tsx` which manages the active tab (About/Projects/Blog/Contact)
- Tab changes trigger layout transitions via the `Layout` component

### Layout System
- **Grid Engine**: `react-grid-layout` with responsive breakpoints (xl: 1920, lg: 1200, md: 768, sm: 480, xs: 200)
- **Layout Definitions**: Static layout configurations in `src/utils/layout.helper.ts` with predefined positions for each tab
- **Grid Items**: 18 items (keys a-q) with manual positioning per breakpoint and tab
- **Responsive**: Different layouts for `lg` (desktop) and `xs` (mobile) breakpoints

### Key Components
- `App.tsx`: Root component managing tab state and slider positioning
- `components/layout.tsx`: Main grid component that switches layouts based on active tab
- `components/navbar.tsx`: Navigation with animated slider
- `utils/layout.helper.ts`: Layout configurations for each tab (About, Projects, Contact)

### Styling & Animations
- **CSS Framework**: Tailwind CSS with PostCSS
- **Grid Animations**: CSS transitions on `.react-grid-item` (400ms ease) and `.react-grid-placeholder` (100ms)
- **Custom Properties**: Uses CSS custom properties like `--black-1`
- **Responsive Design**: Mobile-first approach with static layouts on smaller screens

### Layout Configuration Pattern
Each tab has specific grid item positions defined in the layout helper:
- Items use `{i, x, y, w, h}` format where `i` is the item key, `x/y` are grid coordinates, `w/h` are width/height in grid units
- Desktop layouts allow dragging (`isResizable: false` but draggable)
- Mobile layouts are completely static (`static: true`)

The manual layout configuration approach means new layouts require explicit coordinate definition in the helper file.