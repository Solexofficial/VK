import { AdaptivityProvider, ConfigProvider, AppRoot } from "@vkontakte/vkui";
import { FC } from "react";

type VKUIProviderProps = {
  children: React.ReactNode;
};

export const VKUIProvider: FC<VKUIProviderProps> = ({ children }) => {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>{children}</AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
