import React, { useState, useRef } from 'react';

const FileUpload = ({
  multiple = false,
  maxSize,
  acceptedTypes = [],
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onError
}) => {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = [];
    const newErrors = [];

    newFiles.forEach(file => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        newErrors.push(`${file.name}: File size exceeds ${maxSize} MB`);
        onError && onError(file, 'File too large');
      } else if (acceptedTypes.length && !acceptedTypes.includes(file.type)) {
        newErrors.push(`${file.name}: Invalid file type. Allowed: ${acceptedTypes.join(', ')}`);
        onError && onError(file, 'Invalid type');
      } else {
        validFiles.push(file);
      }
    });

    setErrors(prev => [...prev, ...newErrors]);

    if (validFiles.length) {
      onUploadStart && onUploadStart(validFiles);
      const newFileItems = validFiles.map(file => ({ file, progress: 0, uploading: true, id: Date.now() + Math.random() }));
      setFiles(prev => multiple ? [...prev, ...newFileItems] : newFileItems);

      newFileItems.forEach(item => {
        simulateUpload(item);
      });
    }
  };

  const simulateUpload = (item) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random progress increase
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onUploadComplete && onUploadComplete(item.file);
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress: 100, uploading: false } : f));
      } else {
        onUploadProgress && onUploadProgress(item.file, progress);
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress } : f));
      }
    }, 200);
    item.interval = interval; // Store to cancel
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const cancelUpload = (id) => {
    setFiles(prev => prev.filter(f => {
      if (f.id === id && f.uploading) {
        clearInterval(f.interval);
      }
      return f.id !== id;
    }));
  };

  const clearError = (index) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          dragging ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Drag files here or click to upload"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      >
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-lg font-medium text-gray-700">Drag files here or click to upload</p>
        <p className="text-sm text-gray-500 mt-1">
          {multiple ? 'Multiple files allowed' : 'Single file only'}
          {maxSize && `, max ${maxSize} MB`}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(Array.from(e.target.files))}
        aria-hidden="true"
      />

      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => clearError(index)} className="text-red-500 hover:text-red-700">×</button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {files.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-800 truncate">{item.file.name}</span>
              <span className="text-xs text-gray-500">({(item.file.size / 1024 / 1024).toFixed(2)} MB)</span>
              {item.uploading && (
                <button
                  onClick={() => cancelUpload(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  aria-label={`Cancel upload of ${item.file.name}`}
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-300 ease-out ${item.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">{item.progress.toFixed(0)}% {item.progress === 100 ? 'Complete' : 'Uploading...'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;