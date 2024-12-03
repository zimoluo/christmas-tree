import aboutConfig from "../config/about";
import cherryConfig from "../config/cherry";
import christmasConfig from "../config/christmas";
import glitterConfig from "../config/glitter";
import homeConfig from "../config/home";
import moriConfig from "../config/mori";
import penumbraConfig from "../config/penumbra";
import rainbowConfig from "../config/rainbow";
import vitreousConfig from "../config/vitreous";
import plainGrayConfig from "../config/plainGray";
import perpetuityConfig from "../config/perpetuity";
import duskConfig from "../config/dusk";

export const themeKeyMap: Record<ThemeKey, ThemeDataConfig> = {
  home: homeConfig,
  about: aboutConfig,
  glitter: glitterConfig,
  rainbow: rainbowConfig,
  christmas: christmasConfig,
  cherry: cherryConfig,
  mori: moriConfig,
  vitreous: vitreousConfig,
  penumbra: penumbraConfig,
  plainGray: plainGrayConfig,
  perpetuity: perpetuityConfig,
  dusk: duskConfig,
};
