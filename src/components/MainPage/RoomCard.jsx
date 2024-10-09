import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

export default function RoomCard({room}) {
    if (!room) {
        throw new Error("Room object is required!");
    }
    return <Card>
        <CardMedia
            component="img"
            height="200"
            image={room.image}
            alt={room.name}
        />
        <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
                {room.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {room.location}
            </Typography>
            <Typography variant="body1" component="p" sx={{mt: 1, fontWeight: "bold"}}>
                {room.price} CZK / night
            </Typography>
            <Button
                variant="contained"
                sx={{mt: 2}}
                fullWidth
                component={Link}
                to={`/room/${room.id}`}

            >
                Book Now
            </Button>
        </CardContent>
    </Card>;
}

RoomCard.propTypes = {
    room: PropTypes.object.isRequired,
    onClick: PropTypes.func
};