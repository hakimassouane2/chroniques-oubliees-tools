import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://vercel-admin-user:SYeGHPvKdcucdq3B@cluster0.oqham14.mongodb.net/?retryWrites=true&w=majority";
const dbName = "co-drs-db";

export async function GET() {
  const client = new MongoClient(uri, {});

  await client.connect();
  const database = client.db(dbName);
  const ways = database.collection("ways");
  const pipeline = [
    {
      $project: {
        slug: 1,
        label: 1,
        type: 1,
        additionalDescription: 1,
        linkedProfiles: 1, // Only include the name field from linkedProfiles
        "abilities.label": 1, // Only include the name field from abilities
      },
    },
  ];
  const allWays = await ways.aggregate(pipeline).toArray();
  return NextResponse.json(allWays);
}
