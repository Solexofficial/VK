import { SplitLayout, SplitCol } from "@vkontakte/vkui";
import { BookingMeetingsForm } from "features/BookingMeetingsForm";
import { type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./HomePage.module.scss";

type HomePageProps = {
  className?: string;
};

export const HomePage: FC<HomePageProps> = ({ className }) => {
  return (
    <div className={classNames(cls.homePage, {}, [className])}>
      <SplitLayout className={cls.layout}>
        <SplitCol width={600} maxWidth={600}>
          <BookingMeetingsForm />
        </SplitCol>
      </SplitLayout>
    </div>
  );
};
