import { Box } from '@mui/material';
import concatClasses from 'classnames';
import React from 'react';

interface PaginationContainerProps {
  children: React.ReactNode;
  disabled?: boolean;
  isWrapped: boolean;
}

const PaginationContainer = React.forwardRef<HTMLDivElement, PaginationContainerProps>(({ children, disabled, isWrapped }, ref) => {
  const className = concatClasses('PaginationContainer', {
    Disabled: disabled,
    CenterJustify: isWrapped,
  });

  return (
    <Box ref={ref} className={className}>
      {children}
    </Box>
  );
});

PaginationContainer.displayName = 'PaginationContainer';

export default PaginationContainer;
