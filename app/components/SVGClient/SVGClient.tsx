"use client";

import { ReactSVG } from "react-svg";

type SVGClientProps = React.ComponentPropsWithoutRef<typeof ReactSVG>;

const SVGClient = ({ ...props }: SVGClientProps) => (
  <ReactSVG className="react-svg" {...props} />
);

export default SVGClient;
