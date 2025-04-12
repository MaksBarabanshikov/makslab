'use client'

import { useState, ChangeEvent } from 'react'
import { Prize } from './Wheel' 

import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"

import { X, Plus } from 'lucide-react'

interface SectorManagerProps {
  sectors: Prize[];
  onSectorsChange: (newSectors: Prize[]) => void;
}

export default function FortuneSectorManager({ sectors, onSectorsChange }: SectorManagerProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleAdd = (): void => {
    if (inputValue.trim()) {
      const newSectors = [...sectors, { text: inputValue }];
      onSectorsChange(newSectors);
      setInputValue('');
    }
  }

  const handleRemove = (index: number): void => {
    const newSectors = sectors.filter((_, i) => i !== index);
    onSectorsChange(newSectors);
  }

  const handleLabelChange = (index: number, newLabel: string): void => {
    const updatedSectors = [...sectors];
    updatedSectors[index] = { ...updatedSectors[index], text: newLabel };
    onSectorsChange(updatedSectors);
  }

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4">Секции</h2>
      <ul className="flex flex-col gap-2 mb-4">
        {sectors.map((sector, i) => (
          <li key={i} className="flex items-center gap-2">
            <Input
              type="text"
              value={sector.text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleLabelChange(i, e.target.value)
              }
              className="flex-1"
              aria-label={`Редактировать секцию ${sector.text}`}
            />
            <Button
              variant="outline"
              size="icon"  
              onClick={() => handleRemove(i)}
              aria-label={`Удалить секцию ${sector.text}`}
              className="text-red-500 hover:text-red-700" 
            >
              <X className="h-4 w-4" /> 
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
      <Input
          type="text"
          placeholder="Название новой секции"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
          className="flex-1"
        />
        <Button
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
           <Plus className="mr-2 h-4 w-4" /> 
           Добавить
        </Button>
      </div>
    </div>
  );
}