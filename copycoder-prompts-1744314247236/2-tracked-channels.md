<summary_title>
Tracked Channels Management Page - Empty State
</summary_title>

<image_analysis>
1. Content Structure:
- Main Content Elements: Empty state container with create action
- Content Grouping: Single centered action container
- Visual Hierarchy: Primary focus on create action button
- Content Types: Text, interactive button
- Text Elements: "Tracked channels" page title, "+ Create new channel list" button text

2. Layout Structure:
- Content Distribution: Centered empty state container in main content area
- Spacing Patterns: Generous padding around create action container
- Container Structure: Bordered container with rounded corners
- Grid/Alignment: Single column layout
- Responsive Behavior: Container should maintain centered position with responsive width

3. UI Components (Page-Specific):
- Content Cards/Containers: Empty state container with dashed border
- Interactive Elements: Create new channel list button
- Data Display Elements: None in empty state
- Status Indicators: None visible
- Media Components: None present

4. Interactive Patterns:
- Content Interactions: Clickable create button
- State Changes: Likely hover state for create button
- Dynamic Content: List area will populate with channel lists when created
- Mobile Interactions: Touch target for create button

<development_planning>
1. Component Structure:
- EmptyState component
- CreateChannelList button component
- Page container component
- Props for handling create action
- State for tracking channel list data

2. Content Layout:
- Flexbox centering for empty state
- Responsive container width
- Consistent padding system
- Dynamic list rendering structure

3. Integration Points:
- Theme integration for colors and typography
- Shared button component styling
- Empty state pattern consistency
- Channel list data management

4. Performance Considerations:
- Minimal initial load with empty state
- Lazy loading for channel list data
- Optimized button interaction
- Efficient list rendering preparation

</development_planning>