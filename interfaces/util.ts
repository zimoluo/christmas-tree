type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface ImageIconProps {
  color?: HexColor | null;
  className?: string;
  height?: number;
  width?: number;
  isLight?: boolean;
  isSaturated?: boolean;
  strokeWidth?: number;
}
