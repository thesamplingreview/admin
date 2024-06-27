import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import AssetItem from './AssetItem.jsx';
import { showFancyBox } from './utils';

export default function FbGallery({
  dataset = [],
  size = '80px',
  ...props
}) {
  const fancybox = useRef(null);

  const handleShow = (index) => {
    fancybox.current = showFancyBox(dataset, {
      startIndex: index,
    });
  };

  useEffect(() => {
    return () => {
      if (fancybox.current) {
        fancybox.current.destroy();
      }
    };
  }, []);

  return (
    <Box
      {...props}
      display="flex"
      flexWrap="wrap"
    >
      {dataset.map((d, i) => (
        <AssetItem
          key={i}
          src={d.src}
          type={d.type}
          size={size}
          onClick={() => handleShow(i)}
        />
      ))}
    </Box>
  );
}
