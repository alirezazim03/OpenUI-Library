# Profile Card

A sleek and interactive profile card built with React and Tailwind CSS. Displays an avatar, name, short bio, social media links, and a call-to-action button to view the portfolio.

**Author:** [@abhijeet-singhh](https://github.com/abhijeet-singhh)

---

## Features

- Circular avatar with hover animation  
- Name and short bio section  
- Social media links (Twitter/X, GitHub, LinkedIn)  
- "View Portfolio" button with callback  
- Fully responsive design using Tailwind CSS  
- Customizable with props

---

## Props

| Prop              | Type     | Default   | Description                                                              |
| ----------------- | -------- | --------- | ------------------------------------------------------------------------ |
| `avatarUrl`       | string   | `""`      | URL of the profile avatar image                                          |
| `name`            | string   | `""`      | Full name of the person                                                  |
| `bio`             | string   | `""`      | Short description or bio                                                 |
| `socialLinks`     | object   | `{}`      | Object containing URLs for `twitter`, `github`, and `linkedin` profiles |
| `onViewPortfolio` | function | undefined | Callback triggered when the "View Portfolio" button is clicked           |

---

## Usage

```jsx
import ProfileCard from "./ProfileCard"

function App() {
  const social = {
    twitter: "https://twitter.com/user",
    github: "https://github.com/user",
    linkedin: "https://linkedin.com/in/user"
  }

  const handlePortfolioClick = () => {
    console.log("View Portfolio clicked")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ProfileCard
        avatarUrl="https://example.com/avatar.jpg"
        name="Abhijeet Singh"
        bio="UI/UX Designer creating beautiful and user-friendly interfaces"
        socialLinks={social}
        onViewPortfolio={handlePortfolioClick}
      />
    </div>
  )
}
```

---

## Customization Tips

- Replace the default icons/text with actual SVG icons for better UX.  
- Adjust background gradients or font styles via Tailwind classes.  
- Extend the component to support themes or more social platforms.

---

## License

MIT © [Abhijeet Singh](https://github.com/abhijeet-singhh)