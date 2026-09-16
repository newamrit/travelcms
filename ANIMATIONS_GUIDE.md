# Hover & Loading Animations - Implementation Guide

## Overview

Comprehensive hover and loading animations have been added throughout the application to enhance user experience and provide visual feedback during interactions and data loading.

## Animation Components Created

### 1. LoadingSpinner Component
**Location:** `src/components/common/LoadingSpinner.tsx`

**Features:**
- Multiple sizes (sm, md, lg)
- Customizable colors
- Optional text label
- Full-screen overlay mode
- Smooth spinning animation

**Usage:**
```tsx
<LoadingSpinner size="lg" text="Loading data..." />
<LoadingSpinner fullScreen={true} />
```

### 2. SkeletonLoader Components
**Location:** `src/components/common/SkeletonLoader.tsx`

**Components:**
- `Skeleton` - Base skeleton component
- `CardSkeleton` - Card placeholder
- `TableRowSkeleton` - Table row placeholder
- `StatCardSkeleton` - Statistics card placeholder
- `ListSkeleton` - List items placeholder
- `FormSkeleton` - Form placeholder

**Features:**
- Shimmer wave animation
- Pulse animation option
- Customizable dimensions
- Multiple variants (text, circular, rectangular, rounded)

**Usage:**
```tsx
<CardSkeleton />
<StatCardSkeleton />
<TableRowSkeleton />
<ListSkeleton count={5} />
```

### 3. Button Component
**Location:** `src/components/common/Button.tsx`

**Features:**
- Multiple variants (primary, secondary, danger, success, outline)
- Multiple sizes (sm, md, lg)
- Loading state with spinner
- Icon support (left/right position)
- Ripple effect on click
- Full-width option
- Hover animations

**Usage:**
```tsx
<Button 
  variant="primary" 
  loading={isLoading}
  icon={<Plus className="w-4 h-4" />}
>
  Create New
</Button>
```

### 4. AnimatedCard Component
**Location:** `src/components/common/AnimatedCard.tsx`

**Features:**
- Multiple hover effects (lift, scale, glow, shine)
- Stagger animation for lists
- Customizable delay
- Click handler support
- TileCard variant for tiles

**Usage:**
```tsx
<AnimatedCard hoverEffect="lift" delay={100}>
  <div>Card content</div>
</AnimatedCard>

<TileCard 
  icon={<Icon />}
  title="Title"
  description="Description"
  color="from-blue-500 to-blue-700"
/>
```

## CSS Animations Added

### Hover Effects

#### 1. hover-lift
```css
transform: translateY(-4px);
box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
```
**Use:** Cards, buttons, tiles

#### 2. hover-scale
```css
transform: scale(1.05);
```
**Use:** Icons, images, small elements

#### 3. hover-glow
```css
box-shadow: 0 0 20px rgba(1, 40, 113, 0.3);
```
**Use:** Primary buttons, important elements

#### 4. hover-shine
```css
background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
```
**Use:** Premium cards, featured items

#### 5. hover-border-animate
```css
background: linear-gradient(45deg, #012871, #f35500);
```
**Use:** Special cards, highlighted items

### Loading Animations

#### 1. Shimmer (Skeleton Loading)
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```
**Use:** Skeleton loaders, loading placeholders

#### 2. Pulse Ring
```css
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; }
}
```
**Use:** Notification badges, status indicators

#### 3. Bounce Subtle
```css
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```
**Use:** Icons, badges, small elements

#### 4. Fade In Up
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```
**Use:** Page transitions, content reveal

#### 5. Slide In Right
```css
@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```
**Use:** Side panels, notifications

#### 6. Spin Slow
```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```
**Use:** Loading indicators, refresh icons

#### 7. Gradient Shift
```css
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```
**Use:** Animated backgrounds, hero sections

### Special Effects

#### 1. Ripple Effect
```css
.ripple::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  animation: ripple 0.6s linear;
}
```
**Use:** Buttons, clickable elements

#### 2. Button Loading State
```css
.btn-loading::after {
  content: '';
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;
}
```
**Use:** Submit buttons, action buttons

#### 3. Card Hover Effect
```css
.card-hover-effect:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px -10px rgb(0 0 0 / 0.15);
}
```
**Use:** All cards, tiles

#### 4. Icon Hover Rotate
```css
.icon-hover-rotate:hover {
  transform: rotate(12deg) scale(1.1);
}
```
**Use:** Icons in cards, buttons

#### 5. Stagger Animation
```css
.stagger-item:nth-child(1) { animation-delay: 0.05s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
/* ... up to 12 items */
```
**Use:** Lists, grids, multiple items

## Pages Updated with Animations

### 1. Dashboard
**Loading States:**
- Stat cards skeleton loading
- Main cards skeleton loading
- 800ms simulated loading delay

**Animations:**
- Fade-in-up on page load
- Hover effects on all cards
- Stagger animation on lists

**Components Used:**
- `StatCardSkeleton`
- `CardSkeleton`
- `fade-in-up` class

### 2. Bookings
**Loading States:**
- Category tiles skeleton loading
- Stat cards skeleton loading
- 600ms simulated loading delay

**Animations:**
- Fade-in-up on page load
- Hover effects on booking cards
- Stagger animation on booking lists
- Button ripple effects

**Components Used:**
- `CardSkeleton`
- `StatCardSkeleton`
- `Button` component
- `fade-in-up` class

### 3. Vendors
**Loading States:**
- Menu tiles skeleton loading
- Category tiles skeleton loading
- 600ms simulated loading delay

**Animations:**
- Fade-in-up on page load
- Hover effects on vendor cards
- Icon hover rotate on category icons
- Stagger animation on vendor lists

**Components Used:**
- `CardSkeleton`
- `fade-in-up` class
- `icon-hover-rotate` class

## Animation Timing

### Loading Delays
- **Dashboard:** 800ms
- **Bookings:** 600ms
- **Vendors:** 600ms
- **Other pages:** 400-600ms (recommended)

### Animation Durations
- **Hover transitions:** 200-300ms
- **Page transitions:** 400-500ms
- **Loading spinners:** 600ms-3s (depending on size)
- **Stagger delays:** 50ms increments
- **Ripple effects:** 600ms

### Animation Easing
- **Hover effects:** `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`
- **Page transitions:** `ease-out`
- **Loading animations:** `linear`
- **Bounce effects:** `ease-in-out`

## Best Practices

### 1. Loading States
✅ **DO:**
- Show skeleton loaders for content
- Use appropriate loading delays (400-800ms)
- Match skeleton shape to actual content
- Use full-screen loader for initial page load

❌ **DON'T:**
- Show loading for < 200ms (too fast to see)
- Show loading for > 2s without progress indication
- Use different loading styles on same page
- Forget to handle error states

### 2. Hover Effects
✅ **DO:**
- Use consistent hover effects across similar elements
- Keep hover animations subtle (200-300ms)
- Provide visual feedback for all interactive elements
- Use lift effect for cards, scale for icons

❌ **DON'T:**
- Use excessive animations that distract
- Mix different hover effects on same page
- Make hover effects too dramatic
- Forget mobile/touch devices

### 3. Performance
✅ **DO:**
- Use CSS animations over JavaScript when possible
- Use `transform` and `opacity` for animations (GPU accelerated)
- Limit simultaneous animations
- Use `will-change` for complex animations

❌ **DON'T:**
- Animate `width`, `height`, `top`, `left` (causes reflow)
- Run too many animations simultaneously
- Forget to test on low-end devices
- Use animations for decorative purposes only

### 4. Accessibility
✅ **DO:**
- Respect `prefers-reduced-motion` media query
- Ensure animations don't interfere with screen readers
- Provide non-animated alternatives
- Keep animations short and purposeful

❌ **DON'T:**
- Use flashing animations (seizure risk)
- Make animations too long or repetitive
- Rely solely on animations for important information
- Forget keyboard navigation

## Implementation Examples

### Adding Loading State to a Page

```tsx
import LoadingSpinner from '../components/common/LoadingSpinner';
import { CardSkeleton, StatCardSkeleton } from '../components/common/SkeletonLoader';

export default function MyPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Load data
      setData(loadData());
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in-up">
      {/* Actual content */}
    </div>
  );
}
```

### Adding Hover Effects to Cards

```tsx
<div className="bg-white rounded-3xl border-2 border-slate-200 p-8 
                hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1
                transition-all duration-300">
  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700
                  flex items-center justify-center shadow-lg
                  group-hover:scale-110 transition-transform duration-300">
    <Icon className="w-10 h-10 text-white" />
  </div>
</div>
```

### Using Button with Loading State

```tsx
const [submitting, setSubmitting] = useState(false);

const handleSubmit = async () => {
  setSubmitting(true);
  await submitData();
  setSubmitting(false);
};

<Button 
  variant="primary" 
  loading={submitting}
  onClick={handleSubmit}
>
  Submit
</Button>
```

## Animation Performance Tips

### 1. Use CSS Transforms
```css
/* Good - GPU accelerated */
transform: translateY(-4px);

/* Bad - causes reflow */
margin-top: -4px;
```

### 2. Limit Animation Scope
```css
/* Good - only animates opacity */
.fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Bad - animates multiple properties */
.complex-animation {
  animation: complex 0.3s ease-out;
}
```

### 3. Use will-change Sparingly
```css
/* Use for elements that will animate */
.will-animate {
  will-change: transform, opacity;
}

/* Remove after animation */
.animated {
  will-change: auto;
}
```

## Browser Compatibility

All animations are compatible with:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Planned Animations
1. **Page Transition Animations** - Smooth transitions between pages
2. **Micro-interactions** - Small feedback animations for clicks, hovers
3. **Scroll Animations** - Elements animate on scroll into view
4. **Progress Animations** - Animated progress bars and indicators
5. **Notification Animations** - Slide-in notifications with animations

### Performance Optimizations
1. **Lazy Loading** - Load animations only when needed
2. **Animation Throttling** - Limit animations on low-end devices
3. **Reduced Motion Support** - Respect user preferences
4. **Animation Caching** - Cache complex animations
5. **Web Animations API** - Use modern animation APIs

## Conclusion

The comprehensive animation system enhances user experience by:
- ✅ Providing visual feedback during loading
- ✅ Making interactions feel responsive
- ✅ Adding polish and professionalism
- ✅ Guiding user attention
- ✅ Creating delightful moments

All animations are:
- 🎨 Consistent with brand colors
- ⚡ Performance-optimized
- ♿ Accessibility-friendly
- 📱 Mobile-responsive
- 🎯 Purposeful and meaningful
