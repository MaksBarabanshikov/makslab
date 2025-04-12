'use client'

import { useState, ChangeEvent } from 'react'
import { Prize } from './Wheel' 

interface SectorManagerProps {
  sectors: Prize[];
  onSectorsChange: (newSectors: Prize[]) => void;
}

export default function FortuneSectorManager({ sectors, onSectorsChange }: SectorManagerProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleAdd = (): void => {
    if (inputValue.trim()) {
      // Создаем новый массив, включая существующие секции и новую
      const newSectors = [...sectors, { text: inputValue }];
      // Передаем обновленный массив родительскому компоненту
      onSectorsChange(newSectors);
      // Очищаем поле ввода
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
            <input
              type="text"
              className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 flex-1"
              value={sector.text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleLabelChange(i, e.target.value)
              }
            />
            <button
              onClick={() => handleRemove(i)}
              className="text-red-400 hover:text-red-600"
              aria-label={`Удалить секцию ${sector.text}`} 
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Добавить секцию"
          className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 flex-1"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
          disabled={!inputValue.trim()} 
        >
          Добавить
        </button>
      </div>
    </div>
  );
}