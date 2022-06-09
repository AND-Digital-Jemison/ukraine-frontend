import { useState } from "react";
import { InputField, DateSelector, Step } from "../common/form";
import { Box } from "@mui/material";
import { parse, format } from "date-fns";
import { enGB } from "date-fns/locale";
import UpDownArrowIcon from "../../public/icons/upDownArrowIcon";

const formatString = "P";
const parseDate = (dateString) => {
  return parse(dateString, formatString, new Date(), {
    locale: enGB,
  });
};

const WhoAreYouStep = () => {
  const [date, setDate] = useState({ day: null, month: null, year: null });

  const handleDateChange = (key, selectedDate) => {
    [
      {
        key: "day",
        setValue: () =>
          setDate({
            ...date,
            day: format(parseDate(selectedDate), "dd"),
            month: format(parseDate(selectedDate), "MM"),
          }),
      },
      {
        key: "year",
        setValue: () =>
          setDate({
            ...date,
            year: format(parseDate(selectedDate), "yyyy"),
          }),
      },
    ]
      .find((item) => item?.key === key)
      .setValue();
  };

  return (
    <Step label="Who are you?">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            mobile: "1fr",
            tablet: "1fr 1fr",
          },
          flex: 1,
          gap: "20px",
        }}
      >
        <InputField label="First Name" width="100%" />
        <InputField label="Last Name" width="100%" />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          <DateSelector
            onChange={(selectedDate) => handleDateChange("day", selectedDate)}
            label="Date of birth"
            views={["day"]}
            placeholder="dd"
            displayFormat="dd"
            width="100%"
            icon={UpDownArrowIcon}
          />
          <DateSelector
            placeholder="mm"
            readOnly
            defaultValue={date?.month}
            views={["month"]}
            displayFormat="MM"
            width="100%"
            icon={UpDownArrowIcon}
          />
          <DateSelector
            onChange={(selectedDate) => handleDateChange("year", selectedDate)}
            placeholder="yyyy"
            views={["year"]}
            displayFormat="yyyy"
            width="100%"
            icon={UpDownArrowIcon}
          />
        </Box>
        <InputField label="Email" width="100%" />
      </Box>
    </Step>
  );
};

export default WhoAreYouStep;
