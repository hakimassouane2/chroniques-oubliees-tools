import { Card, CardContent, Typography } from "@mui/material";
import data from "../../../public/creatures/creatures.json";

const CreatureDetail = async ({ params }: { params: { name: string } }) => {
  const monster = data.find(
    (monster: any) => monster.name[0].value === decodeURIComponent(params.name)
  );

  if (!monster) {
    return <Typography>Monster not found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h1">{monster.name[0].value}</Typography>
      <Card>
        <CardContent>
          <Typography>Category: {monster?.category[0]?.label}</Typography>
          <Typography>Environment: {monster?.environment[0]?.label}</Typography>
          {/* Add other stats and details here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatureDetail;
