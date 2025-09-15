# CodeBuddy Code Guide for Bento Grid Template

This file provides guidance to CodeBuddy Code when working with this React-based bento grid template repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Build**: `npm run build` - TypeScript compilation + Vite build  
- **Lint**: `npm run lint` - ESLint with TypeScript support, max 0 warnings
- **Preview**: `npm run preview` - Preview production build

## Project Architecture

This is a React + TypeScript + Vite application that creates a dynamic bento grid layout powered by `react-grid-layout`. The project demonstrates a customer dashboard with multiple data visualization cards.

### Core Architecture

**State Management Flow:**
- `App.tsx` manages the global tab state using `TabKey` enum (可知可感/可享/可及)
- Tab changes trigger layout transitions through the `Layout` component
- Theme state is managed via `useTheme` hook with localStorage persistence

**Grid System:**
- **Engine**: `react-grid-layout` with responsive breakpoints (xl: 1920, lg: 1200, md: 768, sm: 480, xs: 200)
- **Layout Definitions**: Static configurations in `src/utils/layout.helper.ts` with predefined positions for each tab
- **Grid Items**: 17 items (keys a-q) with manual positioning per breakpoint and tab
- **Responsive**: Different layouts for `lg` (desktop) and `xs` (mobile) breakpoints

### Key Components Structure

**Main Components:**
- `App.tsx`: Root component managing tab state and theme
- `components/layout.tsx`: Main grid component that switches layouts based on active tab
- `components/navbar.tsx`: Navigation with animated slider and theme toggle
- `components/CustomerCards.tsx`: Renders individual grid items with customer data cards
- `components/Timeline.tsx`: Reusable timeline component based on shadcn/ui design
- `services/aiService.ts`: AI service for generating user profile insights

**Card Components:**
- `cards/LocationCard.tsx`: Customer location tracking with timeline (uses Timeline component)
- `cards/NetworkCard.tsx`: Network type and signal strength display  
- `cards/BillingCard.tsx`: Billing history with Recharts line chart
- `cards/ResourceCard.tsx`: Data/voice/SMS usage meters
- `cards/SummaryCard.tsx`: Overview card with key metrics
- `cards/AIProfileCard.tsx`: AI-powered user profile analysis and insights

### Layout Configuration System

Each tab has specific grid item positions defined in `layout.helper.ts`:
- Items use `{i, x, y, w, h, isResizable}` format where `i` is the item key, `x/y` are grid coordinates, `w/h` are width/height in grid units
- Desktop layouts allow dragging (`isResizable: false` but draggable)
- Mobile layouts are completely static (`static: true`)

**Layout Mapping:**
- `TabKey.kejikegan` → `AboutLayout` (customer overview focus)
- `TabKey.kexiang` → `ProjectsLayouts` (projects/services focus)  
- `TabKey.keji` → `ContactLayouts` (contact/support focus)

**Card Mapping in Layout:**
- Tile a: LocationCard (customer location tracking)
- Tile b: NetworkCard (network information)
- Tile c: SummaryCard (overview information)
- Tile d: ResourceCard (usage statistics)
- Tile e: BillingCard (billing history)
- Tile f: AIProfileCard (AI-generated user insights)

### Styling & Theme System

**CSS Architecture:**
- **Framework**: Tailwind CSS with PostCSS
- **Theme System**: Light/dark mode with CSS custom properties and `[data-theme]` attribute
- **Glass Morphism**: Extensive use of backdrop-filter and rgba backgrounds for modern glass effects
- **Grid Animations**: CSS transitions on `.react-grid-item` (400ms ease) and `.react-grid-placeholder` (100ms)

**Theme Implementation:**
- Theme state persisted in localStorage
- Immediate theme application via inline script in `index.html` to prevent flash
- Comprehensive CSS overrides for light mode in `index.css`
- Chart theming via Recharts props based on current theme

### Data Types & Mock Data

**Customer Data Types** (in `src/types/customer.ts`):
- `LocationData`: GPS tracking, network info, location history
- `ResourceData`: Data/voice/SMS usage and limits
- `BillingData`: Payment history, comparisons, 12-month trends
- `NetworkData`: Network type and signal strength

**Mock Data**: Generated in `CustomerCards.tsx` with realistic customer scenarios

### Chart Integration

**Recharts Integration:**
- `BillingCard` uses Recharts `LineChart` for 12-month billing trends
- Theme-aware chart styling (colors, tooltips, axes)
- Responsive chart container with proper aspect ratios

## Important Implementation Notes

**Layout Configuration:**
- Manual layout configuration requires explicit coordinate definition in helper file
- Complex layouts can be challenging to edit - consider using browser console to capture positions
- Grid items must have unique keys matching the `keys` array

**Performance Considerations:**
- CSS `will-change` property used for grid animations
- Responsive grid layout can impact performance with many items
- Glass morphism effects use backdrop-filter which may impact performance on older devices

**CSS Dependencies:**
- Must import `react-grid-layout/css/styles.css` and `react-resizable/css/styles.css`
- Custom CSS heavily relies on Tailwind utilities and CSS custom properties

**Theme System:**
- Theme flash prevention requires inline script in HTML
- Light mode requires comprehensive CSS overrides for text colors and backgrounds
- Glass effects are simplified in light mode for better aesthetics

## AI Integration

**AI Profile Generation:**
- Uses DeepSeek AI model (`deepseek-r1-671b-0414`) for user profile analysis
- Analyzes user behavior patterns, location data, usage statistics, and billing history
- Generates intelligent insights about user preferences and consumption patterns
- Real-time profile generation with loading states and error handling
- API endpoint: `https://10.0.62.161:5443/open/router/v1/chat/completions`

**AI Service Features:**
- Combines data from all user cards (location, network, resource, billing)
- Generates concise user profiles (150 characters max)
- Analyzes usage patterns, mobility behavior, and spending habits
- Provides actionable insights for customer service and marketing

**Timeline Component:**
- Based on shadcn/ui design principles with custom theming
- Supports multiple theme colors (blue, emerald, orange, cyan, violet)
- Responsive timeline with icons, dates, and descriptions
- Used in LocationCard for displaying location history