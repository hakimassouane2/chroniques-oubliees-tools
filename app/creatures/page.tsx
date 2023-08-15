import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";

const Creatures = async () => {
  const monstersData = await axios.get(
    "https://raw.githubusercontent.com/hakimassouane2/chroniques-oubliees-tools/main/public/creatures/creatures.json"
  );
  return (
    <div>
      <Typography variant="h1">Creature List</Typography>
      <Grid container spacing={2}>
        {monstersData.map((monster: any, index: any) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link
              href={`/creatures/${encodeURIComponent(monster.name[0].value)}`}
            >
              <a>
                <Card>
                  <CardMedia
                    component="img"
                    alt={monster.picture[0].alt}
                    height="140"
                    image={monster.picture[0].creature_token_url}
                  />
                  <CardContent>
                    <Typography variant="h6">
                      {monster.name[0].value}
                    </Typography>
                    <Typography>{monster.category[0].label}</Typography>
                    <Typography>{monster.environment[0].label}</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Creatures;
