import { connect } from "frontity";
import { Typography } from "@mui/material";
import {
    MaxRestraintWrapper,
    PageHeader,
} from "../common";

const Volunteer = ({ state }) => {
    const data = state.source.get(state.router.link);
    const volunteer = state.source[data.type][data.id];
    const {
        volunteerTitle,
        volunteerInfo,
    } = volunteer.acf;

    return (
        <PageHeader>
            <MaxRestraintWrapper>
                <Typography
                    variant="h1"
                    color="textColor.main"
                    sx={{
                        fontWeight: 600,
                        fontSize: "42px",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        margin: "0 0 20px 0",
                    }}
                >
                    {volunteerTitle}
                </Typography>
                <Typography
                    paragraph
                    color="textColor.main"
                    sx={{
                        fontWeight: 400,
                        fontSize: "15px",
                    }}
                >
                    {volunteerInfo}
                </Typography>
            </MaxRestraintWrapper>
        </PageHeader>
    );
};

export default connect(Volunteer);