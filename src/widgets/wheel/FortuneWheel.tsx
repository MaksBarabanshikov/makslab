'use client'

import { useState } from 'react'
import FortuneWheel, { Prize } from './Wheel'
import FortuneSectorManager from './FortuneSectorManager'

const DEFAULT_SECTORS: Prize[] = [
  { text: '🍕 Пицца' },
  { text: '💰 100₽' },
  { text: '😢 Ничего' },
  { text: '🎁 Подарок' },
  { text: '🔥 Джекпот' },
  { text: '💩' }
]

export default function FortuneWheelClassic() {
  const [sectors, setSectors] = useState<Prize[]>(DEFAULT_SECTORS);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const handleWheelResult = (res: Prize) => {
    setSelectedLabel(res.text);
  };
  
  const handleSectorsChange = (newSectors: Prize[]) => {
    setSectors(newSectors);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white p-8 gap-8 flex-col lg:flex-row">
      <div className="flex flex-col items-center gap-4">
        <FortuneWheel prizes={sectors} onResult={handleWheelResult}></FortuneWheel>
        {selectedLabel && (
          <div className="mt-2 text-lg text-center text-green-400 font-semibold">
            🎉 Выпало: <span className="underline">{selectedLabel}</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <FortuneSectorManager
          sectors={sectors} 
          onSectorsChange={handleSectorsChange} 
        />
      </div>
    </div>
  )
}