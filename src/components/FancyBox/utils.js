import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export const typeMapping = {
  image: 'image',
  video: 'html5video',
  file: 'iframe',
};

export function showFancyBox(src, options) {
  const assets = src.map((d) => ({
    src: d.src,
    downloadSrc: d.src,
    type: typeMapping[d.type],
  }));

  const fb = new Fancybox(assets, {
    ...options,
    closeExisting: true,
    Toolbar: {
      enabled: true,
      display: {
        right: ['zoomIn', 'zoomOut', 'download', 'close'],
      },
    },
  });

  return fb;
}
