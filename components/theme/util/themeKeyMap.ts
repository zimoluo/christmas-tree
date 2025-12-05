import aboutConfig from "../config/about";
import cherryConfig from "../config/cherry";
import christmasConfig from "../config/christmas";
import glitterConfig from "../config/glitter";
import homeConfig from "../config/home";
import penumbraConfig from "../config/penumbra";
import duskConfig from "../config/dusk";
import celebrationConfig from "../config/celebration";
import vitreousConfig from "../config/vitreous";
import galleryConfig from "../config/gallery";
import aquariumConfig from "../config/aquarium";
import eventideFestiveConfig from "../config/eventideFestive";

export const themeKeyMap: Record<ThemeKey, ThemeDataConfig> = {
  home: homeConfig,
  about: aboutConfig,
  glitter: glitterConfig,
  christmas: christmasConfig,
  cherry: cherryConfig,
  penumbra: penumbraConfig,
  dusk: duskConfig,
  celebration: celebrationConfig,
  vitreous: vitreousConfig,
  gallery: galleryConfig,
  aquarium: aquariumConfig,
  eventideFestive: eventideFestiveConfig,
};
