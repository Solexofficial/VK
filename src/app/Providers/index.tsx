import { VKUIProvider } from "./VKUI/ui/VKUIProvider";

import { FC } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <VKUIProvider>{children}</VKUIProvider>;
};
