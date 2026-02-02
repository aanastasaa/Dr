
import React from 'react';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  content: React.ReactNode;
  icon?: string;
}

export interface RSVPData {
  name: string;
  attending: boolean;
  guests: number;
  favoriteSong: string;
}