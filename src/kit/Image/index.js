import React, { useState } from 'react';

export default function Image(props) {
  const { src, width, height, alt = '', ...restProps } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setIsLoadFailed(true);
  };

  return (
    <picture style={{width, height, display: 'inline-block', overflow: 'hidden'}}>
      {isLoading && 'loading'}
      {isLoadFailed && 'load failed'}
      {!isLoadFailed && (
        <img
          onLoad={handleLoad}
          onError={handleError}
          src={src}
          alt={alt}
          {...restProps}
        />
      )}
    </picture>
  );
}
