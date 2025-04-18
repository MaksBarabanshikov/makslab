import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/shared/ui/shadcn/dialog';
import { Prize } from './Wheel';
import { Button } from '@/shared/ui/shadcn/button';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  prize: Prize | null;
}

export default function FortuneCongradulationModal({ isOpen, prize, onOpenChange }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">🎉 Поздравляем! 🎉</DialogTitle>
          <DialogDescription className="text-center pt-4 text-lg">
            Вы выиграли:
            <span className="block font-bold text-3xl text-green-400 pt-2 pb-4">
              {prize?.text ?? 'Что-то невероятное!'}
            </span>
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
  );
}
