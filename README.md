# Open UI Library

A community-driven, open-source library of reusable UI components for modern web development.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub issues](https://img.shields.io/github/issues/YOUR_HANDLE/open-ui-library)
![GitHub pull requests](https://img.shields.io/github/issues-pr/YOUR_HANDLE/open-ui-library)

## 🚀 Features

- **Multi-Framework Support**: Components for React, Vue, Svelte, HTML/CSS, and Tailwind
- **Production Ready**: All components are tested and production-ready
- **Fully Responsive**: Mobile-first design approach
- **Well Documented**: Comprehensive documentation and examples
- **Type Safe**: TypeScript support for applicable frameworks
- **Accessible**: Built with accessibility best practices

## 📦 Components

Currently available components:

### Navbars
- **Simple Center** (Tailwind) - Clean, centered navigation
- **Ecommerce Sticky** (React) - Feature-rich ecommerce navigation

### Coming Soon
- Footers
- Buttons
- Forms
- Cards
- Hero sections

## 🏗️ Project Structure

This is a monorepo managed with pnpm workspaces:

```
open-ui-library/
├── apps/
│   └── web/                 # Next.js preview site
├── packages/
│   ├── ui-metadata/         # Component metadata schema
│   └── tooling/            # Development tools
├── components/
│   ├── navbar/
│   ├── footer/
│   └── button/
└── .github/                # GitHub templates and workflows
```

## 🚀 Quick Start

### View Components

Visit the [live preview site](https://your-domain.vercel.app) to browse all available components.

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_HANDLE/open-ui-library.git
cd open-ui-library
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start the development server**
```bash
pnpm dev
```

4. **Open your browser**
Navigate to `http://localhost:3000` to view the component library.

## 📖 Usage

### Using Components

Each component comes with detailed documentation and examples. Navigate to any component page to see:

- Live preview
- Complete source code
- Usage instructions
- Customization options

### Adding Components to Your Project

1. Browse the component you want to use
2. Copy the source code from the component page
3. Install any required dependencies (like Tailwind CSS)
4. Customize as needed for your project

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch
3. Add your component following our [component structure](#component-structure)
4. Ensure all validations pass: `pnpm validate`
5. Submit a pull request

### Component Structure

Each component should follow this structure:

```
components/[category]/[framework]/[component-name]/
├── component.json          # Metadata (required)
├── [Component files]       # Main component files
└── README.md              # Documentation
```

## 🛠️ Development Scripts

```bash
# Start development server
pnpm dev

# Build the preview site
pnpm build

# Run linting
pnpm lint

# Validate component metadata
pnpm validate:metadata

# Run all validations
pnpm validate
```

## 📋 Component Metadata

All components must include a `component.json` file with the following schema:

```json
{
  "name": "component-name",
  "category": "navbar|footer|button|form|card|hero|section",
  "framework": "react|vue|tailwind|html|svelte",
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "license": "MIT",
  "version": "1.0.0",
  "preview": "Component description",
  "demoUrl": "https://optional-demo-url.com"
}
```

## 🔧 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Package Management**: pnpm workspaces
- **Validation**: JSON Schema, ESLint, Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- All our amazing contributors
- The open-source community
- Inspiration from other UI libraries

