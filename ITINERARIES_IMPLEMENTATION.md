# Itineraries Page - Material UI Implementation

## Overview
The Itineraries page has been redesigned with a Material UI-inspired card grid layout, featuring two main sections accessible via tabs:
1. **Saved Itineraries** - Displayed as a responsive card grid
2. **Itinerary Builder** - Interactive day-by-day trip planner

## Key Features

### 1. Material UI-Style Tab Navigation
- Clean, modern tab switcher at the top
- Active tab highlighted with primary color background
- Badge showing count of saved itineraries
- Smooth transitions between tabs

### 2. Saved Itineraries Card Grid

#### Card Design (Material UI Principles)
- **Elevation**: Subtle shadow that increases on hover
- **Rounded Corners**: 8px border radius (Material Design standard)
- **Proper Spacing**: 24px padding inside cards, 24px gap between cards
- **Hover Effects**: Shadow elevation and border color change on hover
- **Responsive Grid**: 
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns

#### Card Structure
Each saved itinerary card contains:

**Header Section:**
- Title (truncated to 2 lines if too long)
- Destination with location icon
- Status badge (Draft/Confirmed/Completed) with color coding

**Content Section:**
- Duration (e.g., "7 Days / 6 Nights")
- Passenger count
- Date range (start → end)
- Creation date

**Action Footer:**
- View, Edit, Duplicate buttons (left side)
- Delete button (right side, red on hover)
- Subtle background color to separate from content

#### Status Badge Colors
- **Draft**: Gray/Slate (bg-slate-100, text-slate-700)
- **Confirmed**: Green (bg-green-100, text-green-700)
- **Completed**: Blue (bg-blue-100, text-blue-700)

#### "Create New Itinerary" Card
- Dashed border to indicate it's an action card
- Centered plus icon in a circular primary-colored background
- Hover effect changes border to primary color
- Clicking switches to the Builder tab

### 3. Itinerary Builder

#### Builder Header Card
- Title input field
- Total days counter (read-only)
- Summary stats:
  - Days/Nights count
  - Breakfast/Lunch/Dinner counts with emoji icons
- Clean card design with proper elevation

#### Day Cards
Each day is displayed as an expandable card:

**Collapsed State:**
- Day number in circular badge
- Day title
- Overnight location with map pin icon
- Transport mode with emoji
- Meal indicators (B/L/D badges)
- Expand/collapse chevron
- Up/Down arrows for reordering

**Expanded State:**
- Editable day title
- Overnight location input
- Activity description textarea
- Transport mode dropdown
- Meal checkboxes (Breakfast/Lunch/Dinner)
- Remove day button
- Done button to collapse

#### Add Day Button
- Dashed border style
- Full width
- Hover effect with primary color
- Shows next day number

#### Save/Cancel Actions
- Cancel button (outlined style)
- Save Itinerary button (primary color with shadow)
- Right-aligned for easy access

## Material UI Design Principles Applied

### 1. Elevation System
```css
/* Base elevation */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)

/* Hover elevation */
hover:shadow-lg
```

### 2. Color System
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Slate grays

### 3. Typography Hierarchy
- **H1**: 24px, bold (Page title)
- **H3**: 16px, semibold (Card titles)
- **Body**: 14px, regular (Content)
- **Caption**: 12px, regular (Secondary info)

### 4. Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

### 5. Border Radius
- **Small**: 4px (buttons, inputs)
- **Medium**: 8px (cards)
- **Large**: 12px (modals)
- **Full**: 9999px (circular elements)

### 6. Transitions
```css
transition-all duration-200
```
Smooth transitions for hover states, tab switching, and card expansion.

## Responsive Behavior

### Mobile (< 768px)
- Single column card grid
- Stacked layout for card content
- Full-width buttons
- Collapsible sidebar

### Tablet (768px - 1024px)
- 2-column card grid
- Side-by-side layout where appropriate
- Optimized spacing

### Desktop (> 1024px)
- 3-column card grid
- Full layout with sidebar
- Maximum content width

## Mock Data

The page includes 6 sample saved itineraries:
1. 7-Day Serengeti & Ngorongoro Safari (Tanzania) - Confirmed
2. 5-Day Masai Mara Adventure (Kenya) - Draft
3. 10-Day Tanzania & Zanzibar Combo (Tanzania) - Confirmed
4. 3-Day Gorilla Trekking Experience (Uganda) - Completed
5. 8-Day South Africa Safari & Cape Town (South Africa) - Draft
6. 4-Day Victoria Falls & Chobe (Zimbabwe/Botswana) - Confirmed

## Technical Implementation

### Components Used
- `React.useState` for state management
- `lucide-react` for icons
- Tailwind CSS for styling
- CSS Grid for responsive layout
- Flexbox for internal card layout

### Key Functions
- `addDay()` - Add new day to itinerary
- `removeDay(index)` - Remove day at index
- `updateDay(index, field, value)` - Update day field
- `moveDay(index, direction)` - Reorder days
- `getStatusColor(status)` - Get badge color based on status
- `getTransportIcon(mode)` - Get transport emoji

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels on icon buttons
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast compliance (WCAG AA)

## Future Enhancements

1. **Drag & Drop**: Reorder days with drag-and-drop
2. **Search & Filter**: Filter saved itineraries by destination, status, date
3. **Bulk Actions**: Select multiple itineraries for bulk operations
4. **Export**: Export itineraries to PDF
5. **Templates**: Pre-built itinerary templates
6. **Collaboration**: Share itineraries with team members
7. **Version History**: Track changes to itineraries
8. **Integration**: Connect with booking system

## File Structure

```
src/pages/
├── Itineraries.tsx          # Main itineraries page (NEW)
└── ItineraryBuilder.tsx     # Old builder (DELETED)
```

## Build Output

- **JavaScript**: 357.69 KB (98.85 KB gzipped)
- **CSS**: 43.91 KB (8.30 KB gzipped)
- **HTML**: 0.90 KB (0.50 KB gzipped)

## Conclusion

The Itineraries page now follows Material UI design principles with a clean, modern card grid layout. The implementation is fully responsive, accessible, and provides an excellent user experience for managing travel itineraries.
