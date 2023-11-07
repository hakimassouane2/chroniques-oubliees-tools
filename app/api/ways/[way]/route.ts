import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://vercel-admin-user:SYeGHPvKdcucdq3B@cluster0.oqham14.mongodb.net/?retryWrites=true&w=majority";
const dbName = "co-drs-db";

export async function GET(request: any, { params }: any) {
  const client = new MongoClient(uri, {});

  await client.connect();
  const database = client.db(dbName);
  const ways = database.collection("ways");
  const matchingWay = await ways.findOne({
    slug: params.way,
  });

  if (matchingWay && matchingWay.abilities) {
    const abilityIds = matchingWay.abilities.map(
      (abilityId: ObjectId) => new ObjectId(abilityId)
    );
    const abilities = await database
      .collection("abilities")
      .find({ _id: { $in: abilityIds } })
      .toArray();

    matchingWay.abilities = abilities;
  }
  return NextResponse.json(matchingWay);
}
