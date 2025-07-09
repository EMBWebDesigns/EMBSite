"use client";

import { InteractiveElementsCard } from "./showcase/interactive-elements-card";
import { FormInputsCard } from "./showcase/form-inputs-card";
import { ContentDisplayCard } from "./showcase/content-display-card";
import { OverlaysCard } from "./showcase/overlays-card";
import { TooltipsCard } from "./showcase/tooltips-card";

export const ComponentShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <InteractiveElementsCard />
      <FormInputsCard />
      <ContentDisplayCard />
      <OverlaysCard />
      <TooltipsCard />
    </div>
  );
};