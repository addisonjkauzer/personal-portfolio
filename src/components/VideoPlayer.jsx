import { useEffect, useRef } from 'react';

export default function VideoPlayer({ src }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.load();
  }, [src]);

  return (
    <video ref={ref} controls width="100%" style={{ maxWidth: 960, borderRadius: 8, background: '#000' }}>
      <source src={src} type="video/mp4" />
      Your browser does not support video playback.
    </video>
  );
}
