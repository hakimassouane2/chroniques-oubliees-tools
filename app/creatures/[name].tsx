import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import monstersData from "../../public/creatures/json"; // Import your monsters data here

const CreatureDetail = () => {
  const router = useRouter();
  const { name } = router.query;

  const monster = monstersData.find(
    (monster: any) => monster.name[0].value === name
  );

  if (!monster) {
    return <Typography>Monster not found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h1">{monster.name[0].value}</Typography>
      <Card>
        <CardContent>
          <Typography>Category: {monster.category[0].label}</Typography>
          <Typography>Environment: {monster.environment[0].label}</Typography>
          {/* Add other stats and details here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatureDetail;
