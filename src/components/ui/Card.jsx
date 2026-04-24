import React from 'react';

const Card = ({ 
  children, 
  interactive = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'bg-background-primary border border-border rounded-lg shadow-sm';
  const interactiveClasses = interactive 
    ? 'hover:border-border-strong hover:shadow-md transition-all duration-150 cursor-pointer' 
    : '';
  
  const classes = `
    ${baseClasses}
    ${interactiveClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
