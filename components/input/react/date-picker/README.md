# Interactive Date Picker

A highly interactive and visually appealing date picker component for modern web applications. Features smooth animations, hover effects, drag-to-select for ranges, keyboard navigation, and holiday indicators.

## Features

- **Multiple Selection Modes**: Single date, date range, and multi-date selection
- **Interactive Animations**: Smooth hover effects, scaling, and fade transitions
- **Drag-to-Select**: Intuitive range selection with visual feedback
- **Keyboard Navigation**: Full keyboard support with arrow keys and escape
- **Holiday Indicators**: Visual dots and tooltips for special dates
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Support**: Light and dark mode theming
- **Pulsating Today**: Animated highlight for the current date

## Usage

```jsx
import DatePicker from './DatePicker';

function App() {
  const handleDateSelect = (dates) => {
    console.log('Selected dates:', dates);
  };

  return (
    <DatePicker
      mode="range"
      onDateSelect={handleDateSelect}
      holidays={[
        { date: new Date(2024, 11, 25), label: 'Christmas' },
        { date: new Date(2024, 0, 1), label: 'New Year' }
      ]}
      theme="light"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'single' \| 'range' \| 'multi'` | `'single'` | Selection mode |
| `selectedDates` | `Date \| Array<Date>` | - | Currently selected date(s) |
| `onDateSelect` | `function` | - | Callback when dates are selected |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `holidays` | `Array<{date: Date, label: string}>` | `[]` | Holiday dates with labels |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme for styling |
| `locale` | `string` | `'en-US'` | Locale for date formatting |
| `placeholder` | `string` | `'Select date'` | Input placeholder text |

## Customization

The component uses Tailwind CSS classes for styling. You can customize the appearance by modifying the class names or overriding styles.

For dark theme, pass `theme="dark"`. The component automatically applies appropriate color schemes.

## Dependencies

- React 16.8+ (uses hooks)
- Tailwind CSS (for styling)

## Examples

### Single Date Selection
```jsx
<DatePicker mode="single" onDateSelect={(date) => console.log(date)} />
```

### Date Range Selection
```jsx
<DatePicker
  mode="range"
  onDateSelect={(dates) => console.log(dates)}
  theme="dark"
/>
```

### Multi-Date Selection with Holidays
```jsx
<DatePicker
  mode="multi"
  holidays={holidayList}
  onDateSelect={(dates) => console.log(dates)}
/>
```

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader friendly

## Browser Support

Works in all modern browsers that support ES6 and CSS Grid.