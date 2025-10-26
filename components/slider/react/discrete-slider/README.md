# React Discrete Slider

A clean, accessible, and step-based **Discrete Slider** for React applications.  
Ideal for selecting values at fixed intervals like ratings, levels, or difficulty settings.

**Author:** [@SachinK.C.](https://github.com/sachinxmpl)

---

## ✨ Features

- **Step-based Control:** Moves between fixed increments.
- **Responsive & Accessible:** Works on all devices with keyboard navigation support.
- **Dynamic Marks:** Automatically generates marks based on step size.
- **Lightweight:** Perfect for UI component libraries.

---

## 🧾 Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| `min` | `number` | `0` | Minimum slider value |
| `max` | `number` | `100` | Maximum slider value |
| `step` | `number` | `10` | Step size for discrete intervals |
| `defaultValue` | `number` | `50` | Starting slider value |
| `onChange` | `(value: number) => void` | `null` | Callback triggered when value changes |
---



## Usage

```jsx
import DiscreteSlider from "./DiscreteSlider";

export default function Example() {
  const handleValueChange = (val) => {
    console.log("Slider value:", val);
  };

  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold mb-4">Volume Control</h2>
      <DiscreteSlider min={0} max={100} step={10} defaultValue={40} onChange={handleValueChange} />
    </div>
  );
}