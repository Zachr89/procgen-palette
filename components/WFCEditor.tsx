'use client'

import { useState } from 'react'
import { TilesetPanel } from './TilesetPanel'
import { ConstraintsPanel } from './ConstraintsPanel'
import { OutputCanvas } from './OutputCanvas'
import { ControlPanel } from './ControlPanel'
import { ExportPanel } from './ExportPanel'
import { useWFCStore } from '@/lib/store'

export function WFCEditor() {
  const [activeTab, setActiveTab] = useState<'tiles' | 'constraints' | 'generate'>('tiles')
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">ProcGen Palette</h1>
            <p className="text-sm text-gray-400">Wave Function Collapse Editor</p>
          </div>
          <ExportPanel />
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-gray-900 border-b border-gray-800 px-6">
        <nav className="flex gap-1">
          {[
            { id: 'tiles', label: '1. Design Tiles' },
            { id: 'constraints', label: '2. Set Constraints' },
            { id: 'generate', label: '3. Generate' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'tiles' && <TilesetPanel />}
        {activeTab === 'constraints' && <ConstraintsPanel />}
        {activeTab === 'generate' && (
          <div className="flex-1 flex">
            <div className="flex-1 p-6">
              <OutputCanvas />
            </div>
            <div className="w-80 border-l border-gray-800">
              <ControlPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
