export const Card = ({ 
  children, 
  className = '', 
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700';
  const combinedClasses = `${baseClasses} ${padding} ${className}`;

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  children, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`} {...props}>
      {Icon && <Icon className="w-5 h-5 text-gray-500" />}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {children}
      </h2>
    </div>
  );
};

export const CardContent = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}; 