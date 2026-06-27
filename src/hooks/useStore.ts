// グローバル状態管理 - Zustand
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { getLocalCart, setLocalCart, clearLocalCart } from '@/lib/utils';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      itemCount: 0,

      addItem: (item) => {
        const items = [...get().items];
        const existing = items.find((i) => i.variantId === item.variantId);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          items.push(item);
        }
        set({
          items,
          itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      removeItem: (variantId) => {
        const items = get().items.filter((i) => i.variantId !== variantId);
        set({
          items,
          itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        const items = get().items.map((i) =>
          i.variantId === variantId ? { ...i, quantity } : i
        );
        set({
          items,
          itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      clearCart: () => {
        clearLocalCart();
        set({ items: [], itemCount: 0 });
      },

      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'sanchoku-cart' }
  )
);

// 検索フィルター
interface FilterStore {
  searchQuery: string;
  selectedOrigin: string;
  selectedSeason: string;
  sortBy: string;
  setSearchQuery: (q: string) => void;
  setSelectedOrigin: (origin: string) => void;
  setSelectedSeason: (season: string) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchQuery: '',
  selectedOrigin: '',
  selectedSeason: '',
  sortBy: 'recommended',
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedOrigin: (origin) => set({ selectedOrigin: origin }),
  setSelectedSeason: (season) => set({ selectedSeason: season }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () =>
    set({ searchQuery: '', selectedOrigin: '', selectedSeason: '', sortBy: 'recommended' }),
}));
