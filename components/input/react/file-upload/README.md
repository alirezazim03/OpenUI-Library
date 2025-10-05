# File Upload

A modern, animated file upload component with drag-and-drop functionality, progress tracking, and validation for React applications.

**Author:** [@Ashish-Pandey62](https://github.com/Ashish-Pandey62)

## Features

- Drag-and-drop file upload interface
- Click-to-select file input
- Animated progress bars with smooth transitions
- Support for single or multiple file uploads
- File size and type validation
- Error handling and display
- Cancel individual uploads
- Fully responsive design
- Accessibility features (ARIA labels, keyboard support)
- Customizable styling with Tailwind CSS

## Props

| Prop              | Type              | Default | Description                                      |
| ----------------- | ----------------- | ------- | ------------------------------------------------ |
| `multiple`        | boolean           | false   | Allow multiple files to be selected               |
| `maxSize`         | number            | -       | Maximum file size in MB (optional)                |
| `acceptedTypes`   | array of strings  | []      | Allowed MIME types (e.g., ['image/png', 'image/jpeg']) |
| `onUploadStart`   | function          | -       | Callback when upload starts, receives selected files |
| `onUploadProgress`| function          | -       | Callback for upload progress updates (file, progress) |
| `onUploadComplete`| function          | -       | Callback on successful upload completion (file)   |
| `onError`         | function          | -       | Callback for validation or upload errors (file, error) |

## Usage

```jsx
import FileUpload from './FileUpload'

function App() {
  const handleUploadStart = (files) => {
    console.log('Upload started for files:', files);
  };

  const handleUploadProgress = (file, progress) => {
    console.log(`${file.name}: ${progress.toFixed(0)}% uploaded`);
  };

  const handleUploadComplete = (file) => {
    console.log(`${file.name} uploaded successfully`);
  };

  const handleError = (file, error) => {
    console.error(`Error with ${file.name}: ${error}`);
  };

  return (
    <div className="p-8">
      {/* Single file upload */}
      <FileUpload
        maxSize={5}
        acceptedTypes={['image/png', 'image/jpeg']}
        onUploadStart={handleUploadStart}
        onUploadProgress={handleUploadProgress}
        onUploadComplete={handleUploadComplete}
        onError={handleError}
      />

      {/* Multiple file upload */}
      <FileUpload
        multiple={true}
        maxSize={10}
        acceptedTypes={['image/*', 'application/pdf']}
        onUploadStart={handleUploadStart}
        onUploadProgress={handleUploadProgress}
        onUploadComplete={handleUploadComplete}
        onError={handleError}
      />
    </div>
  )
}
```

## Dependencies

- React 16.8+ (uses hooks)
- Tailwind CSS for styling

## Customization

- **Styling the drop zone**: Modify the `border-dashed` and color classes for different visual effects
- **Progress bar colors**: Change the `bg-blue-500` and `bg-green-500` classes for custom colors
- **Animation speed**: Adjust the `duration-300` class for faster/slower transitions
- **Error messages**: Customize the error display styling by modifying the red-themed classes
- **File icons**: Replace the SVG icon with custom icons or images
- **Responsive behavior**: Adjust the `max-w-lg` class for different container widths

## Accessibility

The component includes several accessibility features:
- ARIA labels for screen readers
- Keyboard navigation support (Enter/Space to trigger file selection)
- Proper focus management
- Semantic HTML structure
- Color contrast compliant with WCAG guidelines