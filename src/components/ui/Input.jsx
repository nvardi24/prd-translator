import { forwardRef } from 'react';

const inputVariants = {
  default: 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500'
};

export const Input = forwardRef(({
  type = 'text',
  variant = 'default',
  error = false,
  success = false,
  className = '',
  ...props
}, ref) => {
  const getVariant = () => {
    if (error) return 'error';
    if (success) return 'success';
    return variant;
  };

  const baseClasses = 'w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-offset-0 transition-colors duration-200';
  const variantClasses = inputVariants[getVariant()];
  const combinedClasses = `${baseClasses} border ${variantClasses} ${className}`;

  return (
    <input
      ref={ref}
      type={type}
      className={combinedClasses}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({
  variant = 'default',
  error = false,
  success = false,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  const getVariant = () => {
    if (error) return 'error';
    if (success) return 'success';
    return variant;
  };

  const baseClasses = 'w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-offset-0 transition-colors duration-200 resize-y';
  const variantClasses = inputVariants[getVariant()];
  const combinedClasses = `${baseClasses} border ${variantClasses} ${className}`;

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={combinedClasses}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export const Label = ({ 
  children, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${className}`} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}; 