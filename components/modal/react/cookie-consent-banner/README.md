# Cookie Consent Banner

A fully GDPR-compliant cookie consent banner component for React with Tailwind CSS. Features customizable text, accept/reject buttons, and granular preference management with persistent storage.

---

**Author:** [@GlenFonceca](github.com/GlenFonceca)

---

## Features

- **GDPR Compliant** - Meets all European data protection requirements
- **Fully Customizable** - Customize text, colors, and position
- **Privacy-First** - No cookies set until explicit user consent
- **Granular Control** - Separate preferences for analytics, marketing, and functional cookies
- **Responsive Design** - Works seamlessly on mobile and desktop
- **Accessible** - WCAG 2.1 compliant with proper ARIA labels
- **Persistent Storage** - Remembers user preferences across sessions
- **Framework Agnostic** - Easy to integrate with any React application

## Installation

No external dependencies required beyond React and Tailwind CSS.

1. Copy the component files to your project
2. Ensure Tailwind CSS is configured in your project
3. Import and use the component

## Usage

### Basic Usage

```jsx
import CookieConsent from './components/CookieConsent'

function App() {
    return (
    <div>
        <CookieConsent />
        {/* Your app content */}
    </div>
)
}
```

### Advanced Usage with Callbacks

```jsx
import CookieConsent from './components/CookieConsent'

function App() {
const handleAccept = (consent) => {
console.log('User accepted cookies:', consent)
// Load analytics scripts
if (consent.analytics) {
// Initialize Google Analytics
}
if (consent.marketing) {
// Initialize marketing pixels
}
}

const handleReject = (consent) => {
console.log('User rejected cookies:', consent)
}

const handlePreferencesSave = (consent) => {
console.log('User saved preferences:', consent)
}

return (
<div>
<CookieConsent position="bottom" title="Cookie Notice" description="We use cookies to improve your experience. Choose your preferences below." onAccept={handleAccept} onReject={handleReject} onPreferencesSave={handlePreferencesSave} cookieName="my_site_consent" expiryDays={365} showSettingsButton={true} policyUrl="/privacy" />
</div>
)
}
```

### Programmatic Control

```jsx
import { useCookieConsent } from './components/useCookieConsent'

function SettingsPage() {
const { consent, withdrawConsent } = useCookieConsent()

const handleWithdraw = () => {
withdrawConsent()
// Banner will reappear
}

return (
<div>
<h1>Privacy Settings</h1>
<p>Current Consent: {JSON.stringify(consent)}</p>
<button onClick={handleWithdraw}>
Withdraw Consent
</button>
</div>
)
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | string | `'bottom'` | Position of banner: `'bottom'` or `'top'` |
| `title` | string | `'We Value Your Privacy'` | Main title text |
| `description` | string | (default text) | Description explaining cookie usage |
| `onAccept` | function | `null` | Callback when user accepts all cookies |
| `onReject` | function | `null` | Callback when user rejects cookies |
| `onPreferencesSave` | function | `null` | Callback when user saves preferences |
| `cookieName` | string | `'user_cookie_consent'` | Name of the cookie storing consent |
| `expiryDays` | number | `365` | Days before consent expires |
| `showSettingsButton` | boolean | `true` | Show manage preferences button |
| `policyUrl` | string | `'/privacy-policy'` | URL to privacy policy page |

## Cookie Categories

The component manages four categories of cookies:

1. **Essential** - Always active, required for basic functionality
2. **Analytics** - Track user behavior and site performance
3. **Marketing** - Personalized advertising and retargeting
4. **Preferences** - Remember user settings and preferences

## Consent Data Structure

```json
{
    essential: true, // Always true
    analytics: boolean,
    marketing: boolean,
    preferences: boolean,
    timestamp: string // ISO 8601 format
}
```


## Customization

### Tailwind Configuration

The component uses default Tailwind colors. To customize, modify the classes in the component files or extend your Tailwind config:

```jsx
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
            'consent-primary': '#your-color',
            }
        }
    }
}
```

### Styling

All styles use Tailwind utility classes and can be customized directly in the component files.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Focus management for modals
- High contrast mode support

## GDPR Compliance Checklist

- Clear information about cookie usage
- Granular consent options
- Equal prominence for accept/reject buttons
- No pre-checked boxes
- Easy access to preferences
- Ability to withdraw consent
- Link to privacy policy
- Consent stored with timestamp

## License

MIT License - feel free to use in personal and commercial projects.

## Support

For issues or questions, please open an issue in the repository.