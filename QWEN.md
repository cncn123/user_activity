# Bento Grid Project Context

## Project Overview
This is a React-based dynamic bento grid template that creates draggable, resizable grid layouts. The project is built with TypeScript and uses Vite as the build tool. The main functionality is powered by the `react-grid-layout` library with smooth CSS transitions and animations.

The project features:
- Dynamic grid layouts that change based on user interactions
- Theme switching (light/dark mode)
- Responsive design with different layouts for desktop (lg) and mobile (xs)
- Glass morphism UI effects
- Tab-based navigation between different grid views
- User profile cards with AI-generated user insights

## Key Technologies
- React 18 with TypeScript
- Vite build system
- react-grid-layout for grid functionality
- Tailwind CSS for styling
- Font Awesome for icons
- Recharts for data visualization

## Project Structure
- `src/App.tsx` - Main application component
- `src/main.tsx` - Entry point
- `src/components/` - React components (Sidebar, Navbar, etc.)
- `src/utils/layout.helper.ts` - Grid layout configurations
- `src/types/` - TypeScript type definitions
- `src/hooks/` - Custom React hooks (e.g., useTheme)
- `src/styles/` - CSS files for theming and effects
- `src/index.css` - Main CSS file with grid styles and animations
- `src/services/` - API service implementations (AI service)
- `src/utils/presetUsers.ts` - User data configurations

## Building and Running
- Install dependencies: `npm install`
- Development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## Development Conventions
- Uses functional components with React hooks
- TypeScript for type safety
- Tailwind CSS classes for styling
- CSS variables for theme management
- Responsive design with mobile-first approach
- Glass morphism effects for modern UI
- Enum-based navigation and user types

## Key Implementation Details
1. Grid layouts are predefined in `src/utils/layout.helper.ts` for different views (About, Projects, Contact)
2. Each layout has configurations for desktop (lg) and mobile (xs) breakpoints
3. Theme switching is managed through a custom hook and localStorage
4. CSS transitions provide smooth animations when grid items move
5. Proxy configuration in `vite.config.ts` for API requests
6. AI service integration for generating user profiles based on data
7. User data is predefined for different user personas (business, student, home)

## Recent Fixes and Improvements
1. Fixed type import issue in Sidebar.tsx - now correctly imports TabKey and UserKey from "../types" instead of "../App"
2. Refactored hardcoded values in App.tsx into a constants object (NAVBAR_CONSTANTS)
3. Removed duplicate CSS rules in index.css to reduce file size and improve maintainability
4. Updated AI service to use environment variables for API configuration instead of hardcoded values
5. Optimized Block component in Sidebar.tsx with React.memo for better performance
6. Removed unused props (left, sliderWidth) from Navbar component and its interface
7. Fixed React hooks dependency issues in Navbar.tsx by properly wrapping functions with useCallback and useMemo
8. Enhanced Sidebar component design with improved visual hierarchy, icons, and animations to better match the overall glass morphism aesthetic
9. Optimized BillingCard component with improved icon design, layout structure, and visual hierarchy

## Important Notes
- CSS imports from `react-grid-layout` are required for proper rendering
- Grid layouts are manually configured for each view
- Performance optimizations use CSS properties like `will-change`
- The project includes glass effects and floating animations
- AI service uses a proxy to a DeepSeek API for user profile generation
- Environment variables should be used for API keys and configuration in production