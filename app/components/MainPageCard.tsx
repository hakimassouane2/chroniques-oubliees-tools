import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";

function MainPageCard(props: any) {
  const isSmall = props.isSmall;
  return (
    <Grid item xs={12} sm={6} md={isSmall ? 3 : 4} lg={isSmall ? 3 : 4}>
      <Card sx={{ borderRadius: 2 }}>
        <Link href={props.url}>
          <CardMedia
            component="img"
            alt={"image"}
            height="350"
            image={props.imageUrl}
            sx={{ backgroundColor: "white" }}
          />
        </Link>
        <CardContent sx={{ p: 2, height: "16rem" }}>
          <Typography variant="h5" color={"primary"}>
            {props.title}
          </Typography>
          <Typography variant="body2" fontFamily={"Roboto"} fontWeight={300}>
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MainPageCard;
