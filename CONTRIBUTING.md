# Contributing to Open UI Library

Thank you for your interest in contributing to Open UI Library! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

- **Add new components** - Create reusable UI components
- **Improve existing components** - Enhance functionality or fix bugs
- **Documentation** - Improve README files, add examples
- **Bug reports** - Help us identify and fix issues
- **Feature requests** - Suggest new components or features

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm 8+
- Git
- A GitHub account

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-ui-library.git
   cd open-ui-library
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Start the development server**:
   ```bash
   pnpm dev
   ```

## 📦 Adding a New Component

### 1. Choose Component Details

- **Category**: `navbar`, `footer`, `button`, `form`, `card`, `hero`, `section`
- **Framework**: `react`, `vue`, `tailwind`, `html`, `svelte`
- **Name**: Use kebab-case (e.g., `dropdown-menu`)

### 2. Create Component Structure

```bash
components/[category]/[framework]/[component-name]/
├── component.json          # Required metadata
├── [Component files]       # Your component code
└── README.md              # Documentation
```

### 3. Component Metadata (`component.json`)

Create a `component.json` file with this structure:

```json
{
  "name": "your-component-name",
  "category": "navbar",
  "framework": "react",
  "tags": ["responsive", "modern"],
  "author": "Your Name",
  "license": "MIT",
  "version": "1.0.0",
  "preview": "Brief description of your component",
  "demoUrl": "https://optional-demo-url.com",
  "props": [
    {
      "name": "propName",
      "type": "string",
      "description": "Description of the prop"
    }
  ]
}
```

### 4. Component Files

#### For React Components
- Use `.jsx` extension
- Follow React best practices
- Include prop validation when applicable
- Use functional components with hooks

#### For HTML/Tailwind Components
- Use `index.html` as the main file
- Include complete HTML structure
- Use CDN links for external dependencies
- Ensure responsive design

#### For Vue/Svelte Components
- Follow respective framework conventions
- Use single-file components where appropriate

### 5. Documentation (`README.md`)

Include:
- Component description
- Features list
- Usage instructions
- Props documentation (for React/Vue)
- Customization guide
- Dependencies

Example structure:
```markdown
# Component Name

Brief description of what the component does.

## Features
- Feature 1
- Feature 2

## Usage
[Usage instructions]

## Props (if applicable)
[Props documentation]

## Customization
[How to customize the component]
```

## 🔍 Code Standards

### JavaScript/JSX
- Use ES6+ features
- No semicolons (configured in ESLint)
- Single quotes for strings
- 2-space indentation
- Meaningful variable names

### CSS/Styling
- Use Tailwind CSS when possible
- Mobile-first responsive design
- Consistent spacing and sizing
- Accessible color contrasts

### General
- Write clear, self-documenting code
- Add comments for complex logic
- Follow existing code patterns
- Test your component thoroughly

## ✅ Before Submitting

### Required Checks

1. **Validate metadata**:
   ```bash
   pnpm validate:metadata
   ```

2. **Run linting**:
   ```bash
   pnpm lint
   ```

3. **Build the site**:
   ```bash
   pnpm build
   ```

4. **Run full validation**:
   ```bash
   pnpm validate
   ```

### Pull Request Checklist

- [ ] Component follows the required folder structure
- [ ] `component.json` is valid and complete
- [ ] Code follows project coding standards
- [ ] Documentation is complete and clear
- [ ] Component is responsive (if applicable)
- [ ] All validation checks pass
- [ ] Screenshots/demos are included in PR
- [ ] License attribution is correct (MIT)

## 📝 Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/add-your-component
   ```

2. **Make your changes** following the guidelines above

3. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add dropdown-menu component for React"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/add-your-component
   ```

5. **Create a Pull Request** on GitHub

### PR Title Format
- `feat: add [component-name] component`
- `fix: resolve issue with [component-name]`
- `docs: improve documentation for [component-name]`

## 🐛 Reporting Issues

When reporting bugs, please include:
- Component name and version
- Browser and OS information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml).

## 💡 Suggesting Components

Use the [component proposal template](.github/ISSUE_TEMPLATE/component_proposal.yml) to suggest new components.

Include:
- Component description
- Use cases
- Framework preference
- Design mockups (if available)

## 🏆 Recognition

Contributors will be:
- Listed in component metadata as authors
- Mentioned in release notes
- Recognized in our contributor list

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/YOUR_HANDLE/open-ui-library/discussions)
- 🐛 [Issue Tracker](https://github.com/YOUR_HANDLE/open-ui-library/issues)

## 📜 Code of Conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before contributing.

---

Thank you for contributing to Open UI Library! 🎉
