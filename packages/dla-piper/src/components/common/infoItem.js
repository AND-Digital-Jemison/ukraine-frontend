import { ListItem } from "@mui/material";
import { Error } from "@mui/icons-material";

const InfoItem = ({ li }) => (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        paddingLeft: "8px",
        fontSize: "14px",
      }}
    >
      <Error color="infoIconColor" sx={{ alignSelf: "flex-start" }} />
      {li}
    </ListItem>
  );

  export default InfoItem;