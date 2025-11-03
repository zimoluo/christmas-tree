interface TreeContent {
  from: string;
  message: string;
  position: [number, number];
  sprite: string;
  date: string;
  neverShowSpoilerWarning?: boolean;
  isPublic?: boolean;
  uniqueId: string;
}

interface TreeSelection {
  hasSelected: boolean;
  sprite: string;
}
