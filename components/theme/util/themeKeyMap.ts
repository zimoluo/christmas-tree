import aboutConfig from "../config/about";
import cherryConfig from "../config/cherry";
import christmasConfig from "../config/christmas";
import glitterConfig from "../config/glitter";
import homeConfig from "../config/home";
import moriConfig from "../config/mori";
import penumbraConfig from "../config/penumbra";
import oasisConfig from "../config/oasis";
import plainGrayConfig from "../config/plainGray";
import duskConfig from "../config/dusk";
import celebrationConfig from "../config/celebration";
import vitreousConfig from "../config/vitreous";
import crimsonConfig from "../config/crimson";
import galleryConfig from "../config/gallery";
import aquariumConfig from "../config/aquarium";

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
  crimson: crimsonConfig,
  gallery: galleryConfig,
  aquarium: aquariumConfig,
};
