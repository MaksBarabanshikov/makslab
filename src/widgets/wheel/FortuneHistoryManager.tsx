'use client';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Prize } from './Wheel';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/shadcn/alert-dialog';
import { Button } from '@/shared/ui/shadcn/button';
import { ScrollArea } from '@/shared/ui/shadcn/scroll-area';
import { Trash2, ListX } from 'lucide-react';

export const FORTUNE_HISTORY_KEY = 'fortuneWheelHistory';

export interface FortuneHistoryManagerRef {
  updateHistoryList: () => void;
}

const FortuneHistoryManager = forwardRef<FortuneHistoryManagerRef>((_, ref) => {
  const [winHistory, setWinHistory] = useState<Prize[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedHistory = localStorage.getItem(FORTUNE_HISTORY_KEY);
    if (savedHistory) {
      try {
        setWinHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history from localStorage', e);
        setWinHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(FORTUNE_HISTORY_KEY, JSON.stringify(winHistory));
    }
  }, [winHistory, isClient]);

  const handleDeleteItem = (indexToRemove: number) => {
    setWinHistory((prevHistory) => prevHistory.filter((_, index) => index !== indexToRemove));
  };

  const handleClearAll = () => {
    setWinHistory([]);
  };

  useImperativeHandle(
    ref,
    () => ({
      updateHistoryList: () => {
        const savedHistory = localStorage.getItem(FORTUNE_HISTORY_KEY);
        if (savedHistory) {
          console.log({ his: savedHistory });
          setWinHistory(JSON.parse(savedHistory));
        }
      },
    }),
    [],
  );

  if (!isClient) {
    return <div className="text-center text-gray-400 mt-10">Загрузка истории...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">История выигрышей</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" disabled={winHistory.length === 0}>
              <ListX className="mr-2 h-4 w-4" />
              Очистить всё
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие удалит всю историю выигрышей без возможности восстановления.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="secondary">Отмена</Button>
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAll} asChild>
                <Button variant="destructive">Удалить</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ScrollArea className="flex-1 h-[500px] pr-4">
        {winHistory.length === 0 ? (
          <p className="text-primary text-center mt-10">История пока пуста.</p>
        ) : (
          <div className="space-y-2">
            {winHistory.map((prize, index) => (
              <div
                key={`${index}-${prize.text}`}
                className="flex items-center justify-between gap-2 p-2 bg-muted rounded border border-primary"
              >
                <span className="flex-1 truncate">{prize.text}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteItem(index)}
                  aria-label={`Удалить "${prize.text}" из истории`}
                  className="text-red-500 hover:text-red-700 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
});

FortuneHistoryManager.displayName = 'FortuneHistoryManager';

export default FortuneHistoryManager;
