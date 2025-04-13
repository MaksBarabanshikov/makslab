'use client';

import { useEffect, useRef, useState } from 'react';
import FortuneWheel, { Prize } from './Wheel';
import FortuneSectorManager from './FortuneSectorManager';
import ReactConfetti from 'react-confetti';
import FortuneCongradulationModal from './FortuneCongradulationModal';
import FortuneHistoryManager, {
  FORTUNE_HISTORY_KEY,
  FortuneHistoryManagerRef,
} from './FortuneHistoryManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

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

  const historyManagerRef = useRef<FortuneHistoryManagerRef>(null);

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
    updateHistoryStorage(prize);
    historyManagerRef.current?.updateHistoryList();
    setIsModalOpen(true);
    setShowConfetti(true);
  };

  const updateHistoryStorage = (prize: Prize) => {
    let history: Prize[] = [];
    const savedHistory = localStorage.getItem(FORTUNE_HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          history = parsedHistory;
        } else {
          console.warn(
            'Данные истории в localStorage не являются массивом, используем пустой массив.',
          );
        }
      } catch (error) {
        console.error('Ошибка парсинга истории из localStorage:', error);
      }
    }
    const newHistory: Prize[] = [prize, ...history];
    try {
      localStorage.setItem(FORTUNE_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Ошибка сохранения истории в localStorage:', error);
    }
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
    <div className="relative flex w-full min-h-screen p-4 md:p-8 gap-8 flex-col lg:flex-row overflow-hidden">
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
      {/* <div className="flex-1">
        <FortuneSectorManager sectors={sectors} onSectorsChange={handleSectorsChange} />
      </div> */}
      <div className="lg:w-1/2 xl:w-1/3 flex flex-col">
        <Tabs defaultValue="sectors" className="flex flex-col flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sectors">Секции</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>
          <TabsContent value="sectors" className="flex-1 mt-4">
            <FortuneSectorManager sectors={sectors} onSectorsChange={handleSectorsChange} />
          </TabsContent>

          <TabsContent value="history" className="flex-1 mt-4">
            <FortuneHistoryManager ref={historyManagerRef} />
          </TabsContent>
        </Tabs>
      </div>
      <FortuneCongradulationModal
        isOpen={isModalOpen}
        onOpenChange={handleModalOpenChange}
        prize={winningPrize}
      />
    </div>
  );
}
