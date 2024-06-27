import { useRef, useEffect } from 'react';
import AssetItem from './AssetItem.jsx';
import { showFancyBox } from './utils';

export default function FbAsset({
  src,
  type,
  size = '80px',
  ...props
}) {
  const fancybox = useRef(null);

  const handleClick = () => {
    fancybox.current = showFancyBox([{ src, type }]);
  };

  useEffect(() => {
    return () => {
      if (fancybox.current) {
        fancybox.current.destroy();
      }
    };
  }, []);

  return (
    <AssetItem
      {...props}
      src={src}
      type={type}
      size={size}
      onClick={handleClick}
    />
  );
}
