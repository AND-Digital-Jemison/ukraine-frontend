import {
    Typography,
    List,
    Box,
} from "@mui/material";

const InfoContainer = ({ title, children }) => {

    return (
        <Box
            variant="div"
            sx={{
                border: "1px solid",
                borderColor: "infoColors.border",
                bgcolor: "infoColors.background",
                borderRadius: "8px",
                padding: "16px",
                margin: "0 0 20px 0",
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    margin: 0,
                    padding: 0,
                    color: "textColor.main",
                }}
            >
                {title}
            </Typography>
            <List sx={{ padding: "0" }}>
                {children}
            </List>
        </Box>
    )
};

export default InfoContainer;