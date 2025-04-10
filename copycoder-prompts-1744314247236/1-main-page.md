Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
Video Content Platform Dashboard with Grid Layout
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: Tracked channels (as specified)
- Left sidebar navigation includes: Research, Tracked channels, Saved videos, Learn
- Top bar contains: Logo (VELIO Beta), Search bar, Random button, Extension button, Profile
- Search bar is centered, dark themed with placeholder "Search a concept"
- User controls in top right: Help icon, Extension button, Profile avatar

2. Layout Components:
- Main content area: ~1200px width
- Left sidebar: ~240px width
- Top navigation bar: ~64px height
- Video grid layout: 4 columns
- Responsive padding: 16px between items

3. Content Sections:
- Video thumbnail grid
- Each thumbnail contains:
  - Preview image
  - Duration badge
  - Title
  - Channel info
  - View count and metrics
  - Timestamp
- Hover states for thumbnails

4. Interactive Controls:
- Search bar with search icon
- Random button
- Extension toggle
- Profile dropdown
- Zoom controls (- and + buttons)
- View mode toggle

5. Colors:
- Background: #121212
- Primary: #00FF8C (green accent)
- Secondary: #2D2D2D (dark grey)
- Text: #FFFFFF
- Accent: #1DB954 (button green)

6. Grid/Layout Structure:
- 4-column grid for desktop
- 16px gutters between items
- Responsive breakpoints at 1200px, 992px, 768px
- Fluid container width
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   └── VideoGrid.tsx
│   ├── features/
│   │   ├── Search/
│   │   ├── VideoCard/
│   │   └── UserControls/
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- Video grid display
- Search functionality
- Channel tracking
- View count metrics
- Responsive layout
- Extension integration

3. State Management:
```typescript
interface AppState {
  videos: {
    items: VideoItem[]
    loading: boolean
    filters: FilterOptions
  }
  search: {
    query: string
    results: SearchResult[]
  }
  user: {
    preferences: UserPreferences
    trackedChannels: Channel[]
  }
}
```

4. Component Architecture:
- App (root)
  - Layout
    - Sidebar
    - TopNav
    - MainContent
      - VideoGrid
        - VideoCard
  - Shared
    - Button
    - SearchBar
    - Avatar

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px,
  'xxl': 1400px
);
```
</development_planning>