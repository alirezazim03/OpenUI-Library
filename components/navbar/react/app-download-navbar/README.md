# App Download Navbar

A clean navigation bar with logo, product links, search functionality, and action buttons for app download, register, and login.

**Author:** [@abhijeet-singhh](https://github.com/abhijeet-singhh)

## Features

- Logo and product links (Supryze, Gifts, Flowers)
- Integrated search bar in the center
- About link on the right
- Prominent "Download App" button
- Register and Login options
- Responsive design with Tailwind CSS classes

## Props

| Prop         | Type     | Default   | Description                                                        |
| ------------ | -------- | --------- | ------------------------------------------------------------------ |
| `onSearch`   | function | undefined | Callback function triggered when a search is performed             |
| `onDownload` | function | undefined | Callback function triggered when the "Download App" button is used |
| `onRegister` | function | undefined | Callback function triggered when the "Register" button is used     |
| `onLogin`    | function | undefined | Callback function triggered when the "Login" link is clicked       |

## Usage

```jsx
import AppDownloadNavbar from "./app_download_navbar"

function App() {
  const handleSearch = query => {
    console.log("Searching for:", query)
  }

  const handleDownload = () => {
    console.log("Download App clicked")
  }

  const handleRegister = () => {
    console.log("Register clicked")
  }

  const handleLogin = () => {
    console.log("Login clicked")
  }

  return (
    <div>
      <AppDownloadNavbar
        onSearch={handleSearch}
        onDownload={handleDownload}
        onRegister={handleRegister}
        onLogin={handleLogin}
      />
      {/* Rest of your app */}
    </div>
  )
}
```