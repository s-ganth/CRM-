import React, { useState } from 'react';
import Card from './Card';

export interface KanbanItem {
  id: number | string;
  title: string;
  content: React.ReactNode;
}

interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardClick?: (item: KanbanItem) => void;
  onItemMove?: (itemId: string | number, newColumnId: string) => void;
}

const KanbanCard: React.FC<{ 
  item: KanbanItem; 
  isDragging: boolean;
  onClick?: (item: KanbanItem) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: KanbanItem) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}> = ({ item, isDragging, onClick, onDragStart, onDragEnd }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      onDragEnd={onDragEnd}
      onClick={() => onClick?.(item)}
      className={`bg-background p-3 rounded-lg border border-border mb-3 transition-opacity ${onClick ? 'cursor-pointer hover:border-primary' : ''} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <h4 className="font-semibold text-sm mb-2 text-text">{item.title}</h4>
      <div className="text-xs text-text-secondary">{item.content}</div>
    </div>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onCardClick, onItemMove }) => {
  const [draggedItemId, setDraggedItemId] = useState<string | number | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: KanbanItem) => {
    e.dataTransfer.setData('text/plain', item.id.toString());
    setDraggedItemId(item.id);
  };
  
  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverColumnId(null);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      onItemMove?.(itemId, columnId);
    }
    setDraggedItemId(null);
    setDragOverColumnId(null);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {columns.map(column => (
        <div 
          key={column.id} 
          className="w-72 bg-card rounded-lg flex-shrink-0 transition-colors"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
          onDragEnter={() => setDragOverColumnId(column.id)}
          onDragLeave={() => setDragOverColumnId(null)}
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-text leading-tight flex items-center justify-between">
              {column.title}
              <span className="text-sm font-normal bg-background text-text-secondary rounded-full px-2 py-0.5">
                {column.items.length}
              </span>
            </h3>
          </div>
          <div className={`p-4 h-full rounded-b-lg transition-colors ${dragOverColumnId === column.id ? 'bg-primary/10' : ''}`}>
            {column.items.map(item => (
              <KanbanCard 
                key={item.id} 
                item={item} 
                onClick={onCardClick}
                isDragging={draggedItemId === item.id}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;