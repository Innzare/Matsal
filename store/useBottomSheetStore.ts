import { create } from 'zustand';

type IContent = {
  content: React.ReactNode | null;
  header?: React.ReactNode | null;
  footer?: React.ReactNode | null;
};

type BottomSheetStore = {
  content: React.ReactNode | null;
  header: React.ReactNode | null;
  footer: React.ReactNode | null;
  snaps?: string[];
  isGlobalBottomSheetOpen: boolean;
  openGlobalBottomSheet: (main: IContent, snaps?: string[]) => void;
  closeGlobalBottomSheet: () => void;
};

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  content: null,
  header: null,
  footer: null,
  snaps: [],
  isGlobalBottomSheetOpen: false,

  openGlobalBottomSheet: (main: IContent, snaps = []) => {
    const { content = null, header = null, footer = null }: any = main;

    set({ content, header, footer, snaps });

    setTimeout(() => {
      set({ isGlobalBottomSheetOpen: true });
    }, 0);
  },

  closeGlobalBottomSheet: () => {
    set({ isGlobalBottomSheetOpen: false, content: null, header: null, footer: null, snaps: [] });
  }
}));
