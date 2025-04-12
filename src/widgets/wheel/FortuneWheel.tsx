'use client';

import { useEffect, useState } from 'react';
import FortuneWheel, { Prize } from './Wheel';
import FortuneSectorManager from './FortuneSectorManager';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/shared/ui/dialog';

import ReactConfetti from 'react-confetti';
import { Button } from '@/shared/ui/button';

const DEFAULT_SECTORS: Prize[] = [
  { text: '🍕 Пицца' },
  { text: '💰 100₽' },
  { text: '😢 Ничего' },
  { text: '🎁 Подарок' },
  { text: '🔥 Джекпот' },
  { text: '💩' },
];

export default function FortuneWheelClassic() {
  const [sectors, setSectors] = useState<Prize[]>(DEFAULT_SECTORS);
  const [winningPrize, setWinningPrize] = useState<Prize | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheelResult = (prize: Prize) => {
    setWinningPrize(prize);
    setIsModalOpen(true);
    setShowConfetti(true);
  };

  const handleSectorsChange = (newSectors: Prize[]) => {
    setSectors(newSectors);
    setWinningPrize(null);
    setIsModalOpen(false);
    setShowConfetti(false);
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setShowConfetti(false);
      setWinningPrize(null);
    }
  };

  return (
    <div className="relative flex w-full min-h-screen bg-gray-900 text-white p-4 md:p-8 gap-8 flex-col lg:flex-row overflow-hidden">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          className="absolute top-0 left-0 w-full h-full z-50"
        />
      )}
      <div className="flex flex-col items-center gap-4">
        <FortuneWheel
          key={JSON.stringify(sectors)}
          prizes={sectors}
          onResult={handleWheelResult}
        ></FortuneWheel>
      </div>
      <div className="flex-1">
        <FortuneSectorManager sectors={sectors} onSectorsChange={handleSectorsChange} />
      </div>
      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center text-yellow-400">
              🎉 Поздравляем! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300 pt-4 text-lg">
              Вы выиграли:
              <p className="font-bold text-3xl text-green-400 pt-2 pb-4 underline">
                {winningPrize?.text ?? 'Что-то невероятное!'}
              </p>
              Желаем удачи в следующий раз!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="default" className="w-full">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
