import { useState, useEffect } from "react";
import { InputField, DateSelector, Step } from "../common/form";
import { Box } from "@mui/material";
import { parse, getMonth, format, isValid } from "date-fns";
import { enGB } from "date-fns/locale";

const formatString = "P";

const parseDate = (dateString) => {
  return parse(dateString, formatString, new Date(), {
    locale: enGB,
  })
}

const isValidDate = (day, month, year) => {
  return isValid(
    parseDate(`${day}/${month}/${year}`)
  );
};

const WhoAreYouStep = () => {
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    if (day) setMonth(format(parseDate(day), 'MM'));

    const result = isValidDate(day, month, year);
    console.log("isValidDate: ", result);
  }, [day]);

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
            setDate={setDay}
            label="Date of birth"
            views={["day"]}
            placeholder="dd"
            displayFormat="dd"
            width="100%"
          />
          <DateSelector
            setDate={setMonth}
            placeholder="mm"
            readOnly
            defaultValue={month}
            views={["month"]}
            displayFormat="MM"
            width="100%"
          />
          <DateSelector
            setDate={setYear}
            placeholder="yyyy"
            views={["year"]}
            displayFormat="yyyy"
            valueFormat='yyyy'
            width="100%"
          />
        </Box>
        <InputField label="Email" width="100%" />
      </Box>
    </Step>
  );
};

export default WhoAreYouStep;
