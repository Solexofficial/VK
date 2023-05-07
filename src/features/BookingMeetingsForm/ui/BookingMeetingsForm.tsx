import {
  Button,
  DateInput,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Group,
  Panel,
  Select,
  Textarea,
  Title,
} from "@vkontakte/vkui";
import { useState, type FC } from "react";
import { validator, ValidatorConfigType } from "shared/utils/validator";

type BookingMeetingsFormProps = {
  className?: string;
};

const initialFormData = {
  tower: "",
  floor: "",
  room: "",
  comment: "",
  date: new Date(),
};

const validatorConfig: ValidatorConfigType<typeof initialFormData> = {
  tower: {
    isRequired: {
      message: "Пожалуйста, укажите башню",
    },
  },
  floor: {
    isRequired: {
      message: "Пожалуйста, выберите этаж",
    },
  },
  room: {
    isRequired: {
      message: "Пожалуйста, выберите переговорку",
    },
  },
  date: {
    isDate: {
      message: "Пожалуйста, укажите дату и время",
    },
  },
};

export const BookingMeetingsForm: FC<BookingMeetingsFormProps> = () => {
  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof data, string>>
  >({});

  const onChange = (name: string, value: any) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setData(initialFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(validate(data));
    if (validate(data)) {
      console.log(JSON.stringify(data));
      setData(initialFormData);
    }
  };

  const validate = (data: typeof initialFormData) => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const hasError = Object.values(errors).some((v) => v !== "");

  return (
    <Panel id="meeting-room">
      <Title level="2" normalize={false}>
        Бронирование переговорной комнаты
      </Title>
      <Group>
        <FormLayout width={600} onSubmit={handleSubmit}>
          <FormLayoutGroup mode="horizontal">
            <FormItem
              top="Выберите башню"
              bottom={errors.tower}
              status={errors.tower ? "error" : "default"}
            >
              <Select
                placeholder="Выберите башню"
                onChange={({ target: { name, value } }) =>
                  onChange(name, value)
                }
                value={data.tower}
                name="tower"
                options={[
                  {
                    value: "A",
                    label: "Башня A",
                  },
                  {
                    value: "B",
                    label: "Башня Б",
                  },
                ]}
              />
            </FormItem>
            <FormItem
              top="Выберите этаж"
              bottom={errors.floor}
              status={errors.floor ? "error" : "default"}
            >
              <Select
                placeholder="Выберите этаж"
                onChange={({ target: { name, value } }) =>
                  onChange(name, value)
                }
                value={data.floor}
                name="floor"
                options={Array.from({ length: 25 }, (_, i) => ({
                  value: i + 3,
                  label: String(i + 3),
                }))}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem
            top="Выберите переговорку"
            bottom={errors.room}
            status={errors.room ? "error" : "default"}
          >
            <Select
              placeholder="Выберите переговорку"
              onChange={({ target: { name, value } }) => onChange(name, value)}
              value={data.room}
              name="room"
              options={Array.from({ length: 10 }, (_, i) => ({
                value: `room_${i + 1}`,
                label: `Комната ${i + 1}`,
              }))}
            />
          </FormItem>

          <FormItem
            top="Выберите дату и время"
            bottom={errors.date}
            status={errors.date ? "error" : "default"}
          >
            <DateInput
              value={data.date}
              name="date"
              onChange={(dateValue) => onChange("date", dateValue)}
              enableTime
              closeOnChange
            />
          </FormItem>
          <FormItem top="Комментарий">
            <Textarea
              maxLength={1000}
              name="comment"
              onChange={({ target: { name, value } }) => onChange(name, value)}
              value={data.comment}
            />
          </FormItem>
          <FormItem>
            <Button
              size="l"
              stretched
              appearance="neutral"
              mode="outline"
              onClick={handleReset}
            >
              Очистить
            </Button>
          </FormItem>
          <FormItem>
            <Button
              type="submit"
              size="l"
              stretched
              appearance="accent-invariable"
              mode="primary"
              disabled={hasError}
            >
              Отправить
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </Panel>
  );
};
