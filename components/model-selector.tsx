'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AVAILABLE_MODELS, DEFAULT_MODEL, type GeminiModel } from '@/lib/gemini';

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState<GeminiModel>(DEFAULT_MODEL);

  useEffect(() => {
    // ローカルストレージから保存されたモデルを取得
    const savedModel = localStorage.getItem('selectedModel') as GeminiModel;
    if (savedModel && AVAILABLE_MODELS.includes(savedModel)) {
      setSelectedModel(savedModel);
    }
  }, []);

  const handleModelChange = (value: string) => {
    const newModel = value as GeminiModel;
    setSelectedModel(newModel);
    localStorage.setItem('selectedModel', newModel);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Model:</span>
      <Select value={selectedModel} onValueChange={handleModelChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_MODELS.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 