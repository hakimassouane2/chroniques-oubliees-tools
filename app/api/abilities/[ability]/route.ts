import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://vercel-admin-user:SYeGHPvKdcucdq3B@cluster0.oqham14.mongodb.net/?retryWrites=true&w=majority";
const dbName = "co-drs-db";

export async function GET(request: any, { params }: any) {
  const client = new MongoClient(uri, {});

  await client.connect();
  const database = client.db(dbName);
  const abilities = database.collection("abilities");
  const matchingAbility = await abilities.findOne({
    name: params.ability,
  });
  return NextResponse.json(matchingAbility);
}
