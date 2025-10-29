# React Continuous Slider

A clean, accessible, and smooth **Continuous Slider** for React applications.  
Ideal for selecting any values with in given range like volumes.

**Author:** [@SachinK.C.](https://github.com/sachinxmpl)

---

## ✨ Features

* **Smooth Control:** Allows continuous value selection (no steps).
* **Responsive & Accessible:** Keyboard and touch-friendly design.
* **Live Value Tooltip:** Displays the current value above the slider thumb.
* **Customizable:** Easily adjustable colors, size, and range.

---

## 🧾 Props

| Prop           | Type                      | Default | Description                 |
| -------------- | ------------------------- | ------- | --------------------------- |
| `min`          | `number`                  | `0`     | Minimum slider value        |
| `max`          | `number`                  | `100`   | Maximum slider value        |
| `defaultValue` | `number`                  | `40`    | Initial slider value        |
| `onChange`     | `(value: number) => void` | `null`  | Callback when value changes |

---

## 🚀 Usage

```jsx
import ContinuousSlider from "./ContinuousSlider";

export default function Example() {
  const handleValueChange = (val) => {
    console.log("Slider value:", val);
  };

  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold mb-4">Opacity Control</h2>
      <ContinuousSlider min={0} max={100} defaultValue={50} onChange={handleValueChange} />
    </div>
  );
}
```
