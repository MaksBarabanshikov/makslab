'use client';
import { Button } from '@/shared/ui/shadcn/button';
import './styles.css'; // Твой файл стилей

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

export type Prize = {
  text: string;
};

type Props = {
  prizes: Prize[];
  onResult: (result: Prize) => void;
  spinDuration?: number;
};

const DEFAULT_SPIN_DURATION = 8000;

function generateColor(index: number, total: number, theme: string | undefined): string {
  const hue = (index * 360) / total;

  let saturation: number;
  let lightness: number;

  if (theme === 'dark') {
    saturation = 65;
    lightness = 70;
  } else {
    saturation = 70;
    lightness = 58;
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function FortuneWheel({
  prizes,
  onResult,
  spinDuration = DEFAULT_SPIN_DURATION,
}: Props) {
  const { theme } = useTheme();
  const dealWheelRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLUListElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const currentSelectedLi = useRef<HTMLLIElement | null>(null);

  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const prizeSlice = 360 / (prizes.length || 1);

  const createConicGradient = useCallback(() => {
    const currentTheme = theme;

    if (prizes.length === 0) {
      const fallbackColor = currentTheme === 'dark' ? 'oklch(0.2 0 0)' : 'oklch(0.95 0 0)';
      return `conic-gradient(${fallbackColor} 0 100%)`;
    }

    const gradientSegments = prizes
      .map((_, i) => {
        const color = generateColor(i, prizes.length, currentTheme);
        const startAngle = 0;
        const endAngle = (100 / prizes.length) * (i + 1);
        return `${color} ${startAngle} ${endAngle}%`;
      })
      .join(', ');

    return `conic-gradient(from -90deg, ${gradientSegments})`;
  }, [prizes, theme]);

  useEffect(() => {
    if (spinnerRef.current) {
      spinnerRef.current.style.background = createConicGradient();
    }
  }, [createConicGradient]);

  const handleSpinEnd = useCallback(
    (finalRotation: number) => {
      if (!isSpinning) return;

      const wheel = dealWheelRef.current;
      const spinner = spinnerRef.current;
      if (!wheel || !spinner) return;

      wheel.classList.remove('is-spinning');

      const normalizedRotation = finalRotation % 360;
      setRotation(normalizedRotation);

      spinner.style.setProperty('--rotate', `${normalizedRotation}deg`);

      const winningAngle = (360 + 90 - normalizedRotation) % 360;
      const index = Math.floor(winningAngle / prizeSlice);
      const selectedIndex = Math.max(0, Math.min(index, prizes.length - 1));
      const selectedPrize = prizes[selectedIndex];

      if (currentSelectedLi.current) {
        currentSelectedLi.current.classList.remove('selected');
      }

      const items = spinner?.querySelectorAll<HTMLLIElement>('.prize');
      if (items?.[selectedIndex]) {
        items[selectedIndex].classList.add('selected');
        currentSelectedLi.current = items[selectedIndex];
      } else {
        currentSelectedLi.current = null;
      }

      if (selectedPrize && onResult) {
        onResult(selectedPrize);
      }

      setIsSpinning(false);
    },
    [isSpinning, onResult, prizeSlice, prizes],
  );

  const spin = () => {
    if (isSpinning || prizes.length === 0) return;

    const wheel = dealWheelRef.current;
    const spinner = spinnerRef.current;
    if (!wheel || !spinner) return;

    setIsSpinning(true);

    if (currentSelectedLi.current) {
      currentSelectedLi.current.classList.remove('selected');
      currentSelectedLi.current = null;
    }

    const randomDegrees = Math.random() * 360;
    const fullSpins = 5;
    const newTargetRotation = rotation + 360 * fullSpins + randomDegrees;
    setTargetRotation(newTargetRotation);

    spinner.style.setProperty('--spin-duration', `${spinDuration}ms`);
    spinner.style.setProperty('--rotate', `${newTargetRotation}deg`);

    wheel.classList.add('is-spinning');

    setTimeout(() => {
      if (dealWheelRef.current?.classList.contains('is-spinning')) {
        console.warn('Spin transitionend fallback timeout triggered.');
        handleSpinEnd(newTargetRotation);
      }
    }, spinDuration + 200);
  };

  const onTransitionEnd = useCallback(
    (event: TransitionEvent) => {
      if (event.target === spinnerRef.current && event.propertyName === 'transform') {
        handleSpinEnd(targetRotation);
      }
    },
    [handleSpinEnd, targetRotation],
  );

  useEffect(() => {
    const spinner = spinnerRef.current;
    if (!spinner) return;

    spinner.addEventListener('transitionend', onTransitionEnd);
    return () => {
      spinner.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [onTransitionEnd]);

  return (
    <div className="deal-wheel" ref={dealWheelRef}>
      <ul
        className={`spinner border-4 border-primary`}
        ref={spinnerRef}
        style={
          {
            '--rotate': `${rotation}deg`,
            '--spin-duration': `${spinDuration}ms`,
          } as React.CSSProperties
        }
      >
        {prizes.map((prize, i) => {
          const rotate = (i + 0.5) * prizeSlice;
          return (
            <li
              className="prize"
              key={`${prize.text}-${i}`}
              style={{
                transform: `rotate(${rotate}deg)`,
              }}
            >
              <span className="text">{prize.text}</span>
            </li>
          );
        })}
      </ul>

      <div className="ticker" ref={tickerRef}></div>
      <Button onClick={spin} disabled={isSpinning} className="btn-spin">
        Крутить
      </Button>
    </div>
  );
}
