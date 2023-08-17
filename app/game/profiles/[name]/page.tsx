import { Card, CardContent, Typography } from "@mui/material";
import data from "../../../../public/profiles/json/profiles.json";

const ProfileDetail = async ({ params }: { params: { name: string } }) => {
  const profile = data.find(
    (profile: any) => profile.name === decodeURIComponent(params.name)
  );

  if (!profile) {
    return <Typography>Profile not found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h1">{profile.name}</Typography>
      <Card>
        <CardContent>
          <Typography>Category: {profile.name}</Typography>
          <Typography>Environment: {profile.name}</Typography>
          {/* Add other stats and details here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
