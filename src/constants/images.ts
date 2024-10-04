import generateResourcePath from "../services/generateResourcePath";

const IMAGES = {
  full_logo_vertical: generateResourcePath("/images/full_logo_vertical.svg"),
  full_logo_horizontal: generateResourcePath(
    "/images/full_logo_horizontal.svg"
  ),
  short_logo: generateResourcePath("/images/short_logo.svg"),
};

export default IMAGES;
