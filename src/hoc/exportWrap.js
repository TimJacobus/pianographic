import React from 'react';

const exportWrap = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  )
};

export default exportWrap;