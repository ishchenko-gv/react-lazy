import React, { useState } from 'react';
import PropTypes from 'prop-types';

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string
};

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  alt: ''
};

export default function Image(props) {
  const {
    src,
    width,
    height,
    alt,
    ...restProps
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setIsLoadFailed(true);
  };

  return (
    <picture
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'inline-block',
        overflow: 'hidden'
      }}
    >
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
