import React from 'react';

export interface ComicPanelProps {
  imageSrc: string;
  altText: string;
  caption: string;
  layout?: 'full' | 'split' | 'grid';
  className?: string;
  children?: React.ReactNode;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}