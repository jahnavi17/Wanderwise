# WanderWise – AI Travel Companion Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern travel platforms like Airbnb and Booking.com, combined with clean SaaS aesthetics. Focus on clarity, aspiration, and ease of use.

## Core Design Principles
- **Approachable & Inspiring**: Create excitement about travel discovery
- **Clarity First**: Clear hierarchy guides users through the journey
- **Modern Minimalism**: Clean, uncluttered interface with purposeful elements

---

## Typography System

**Primary Font**: Poppins (via Google Fonts CDN)
- **Hero/Title**: 600 weight, 3xl-4xl size - "Find Your Perfect Getaway 🌍"
- **Section Headers**: 600 weight, 2xl size
- **Card Titles**: 600 weight, xl size
- **Body Text**: 400 weight, base size
- **Labels**: 500 weight, sm size
- **Footer**: 400 weight, sm size

---

## Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent rhythm
- Form padding: p-8
- Card padding: p-6
- Section gaps: space-y-8 to space-y-12
- Container max-width: max-w-6xl

**Page Structure**:
- Single-page application with vertical flow
- Hero section with centered form (takes ~60-70vh initially)
- Results section appears below after generation
- Footer anchored at bottom

---

## Component Library

### 1. Hero Section
- **Container**: Centered, max-w-2xl
- **Title**: Large, welcoming headline with emoji
- **Subtitle**: Brief tagline explaining the value proposition (e.g., "Let AI discover your next adventure based on your unique preferences")
- **Form Card**: Elevated white card (rounded-2xl, shadow-xl) containing all inputs

### 2. Input Form Components
**Layout**: Vertical stack with consistent spacing (space-y-6)

**Form Fields**:
- Budget: Number input with $ prefix, placeholder "e.g., 2000"
- Duration: Number input with "days" suffix, placeholder "e.g., 7"
- Travel Month: Dropdown/select with all 12 months
- Mood: Dropdown with exactly 4 options (Relaxing / Adventurous / Cultural / Romantic)

**Input Styling**:
- Rounded borders (rounded-lg)
- Clear focus states with ring
- Consistent height (h-12)
- Labels above inputs with proper spacing

**Primary CTA Button**:
- Text: "Generate My Trip"
- Full width or prominent centered placement
- Rounded (rounded-lg)
- Generous padding (px-8, py-3)
- Include travel-related icon (✈️ or 🌍)

### 3. Loading State
**Spinner**: Simple, centered loading indicator
- Displays between form submission and results
- Add loading text: "Discovering your perfect destinations..."
- Minimum animation to indicate processing

### 4. Results Cards (3-Card Grid)
**Grid Layout**:
- Desktop: 3 columns (grid-cols-3)
- Tablet: 2 columns (grid-cols-2)
- Mobile: 1 column (grid-cols-1)
- Gap between cards: gap-6 to gap-8

**Card Structure** (each destination):
- Container: Rounded (rounded-xl), shadow (shadow-lg), white background
- **Image**: Top of card, aspect ratio 16:9 or 4:3, rounded top corners, Unsplash travel images
- **Content Padding**: p-6
- **Destination Name**: Bold, xl size
- **Summary**: 2-3 sentence description
- **Activities List**: Bullet points or numbered list with 3-5 activities
- **Estimated Cost**: Highlighted section showing budget breakdown
- Subtle hover effect (slight scale or shadow increase)

**Fade-in Animation**: Cards animate in sequentially with stagger effect

### 5. Generate Again Button
- Positioned below results cards
- Secondary style (outline or ghost variant)
- Text: "Generate Again" with refresh icon
- Centered placement

### 6. Footer
- **Text**: "Built for Media.net PM Challenge ✈️"
- Centered alignment
- Small, subtle text
- Adequate padding from content above (mt-16 to mt-20)

---

## Visual Design

### Background Treatment
**Gradient**: Light blue to white vertical gradient
- Top: Light blue (#E0F2FE or similar)
- Bottom: White (#FFFFFF)
- Smooth transition covering full viewport

### Card Design
- **Background**: Pure white (#FFFFFF)
- **Borders**: Rounded corners (rounded-xl to rounded-2xl)
- **Shadows**: Layered shadows for depth (shadow-lg to shadow-xl)
- **Hover States**: Subtle elevation increase

### Whitespace & Breathing Room
- Generous padding within cards
- Clear separation between sections
- Form inputs have comfortable spacing
- Results section has top margin from form (mt-12 to mt-16)

---

## Iconography
**Library**: Heroicons (via CDN)
- Form field icons (budget: currency, duration: clock, month: calendar, mood: emoji/face)
- Button icons (plane for generate, refresh for regenerate)
- Activity list icons (map pin, camera, utensils, etc.)

---

## Interaction & Animation

### Animations (Minimal & Purposeful)
- **Form Submit**: Smooth transition to loading state
- **Results Appear**: Fade-in with slight upward motion, staggered by 100-150ms per card
- **Button Hover**: Subtle scale (1.02) or shadow increase
- **Focus States**: Clear ring indicators on inputs

### Responsive Behavior
- Mobile: Stack all elements vertically, full-width cards
- Tablet: 2-column card grid
- Desktop: 3-column card grid, wider form inputs

---

## Images

**Hero Section**: No large hero image - focus remains on the form and title

**Destination Cards**: Each of the 3 result cards requires a destination image
- Source: Unsplash API or placeholder
- Subject: Travel/landscape photos relevant to destination
- Aspect Ratio: 16:9 or 4:3
- Position: Top of each card
- Treatment: Slightly rounded top corners matching card

**Image Implementation**:
- Use responsive images (object-cover for consistent sizing)
- Lazy loading for performance
- Alt text with destination name

---

## Accessibility
- Semantic HTML throughout (form, labels, buttons, articles for cards)
- All inputs have associated labels
- Focus indicators clearly visible
- Color contrast meets WCAG AA standards
- Loading states announced to screen readers