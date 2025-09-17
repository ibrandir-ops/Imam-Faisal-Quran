'use client';
import { forwardRef, useEffect, useRef } from 'react';

type AudioPlayerProps = {
  src: string | null;
  onEnded: () => void;
};

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ src, onEnded }, ref) => {
    const internalRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      const audio = internalRef.current;
      if (!audio) return;

      const handleEnded = () => onEnded();

      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }, [onEnded]);

    useEffect(() => {
      const audio = internalRef.current;
      if (!audio) return;

      if (src) {
        if (audio.src !== src) {
          audio.src = src;
        }
        audio.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audio.pause();
      }
    }, [src]);
    
    const handleRef = (el: HTMLAudioElement | null) => {
        internalRef.current = el;
        if (typeof ref === 'function') {
            ref(el);
        } else if (ref) {
            ref.current = el;
        }
    };

    // The audio element is not visible to the user
    return <audio ref={handleRef} />;
  }
);

AudioPlayer.displayName = 'AudioPlayer';
