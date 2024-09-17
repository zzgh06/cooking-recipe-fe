declare module 'react-rating-stars-component' {
  import React from 'react';

  interface ReactStarsProps {
    count?: number;
    value?: number;
    onChange?: (newRating: number) => void;
    size?: number;
    isHalf?: boolean;
    edit?: boolean;
    activeColor?: string;
  }

  const ReactStars: React.FC<ReactStarsProps>;

  export default ReactStars;
}
