// pages/api/getAllRaces.js

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://adminhakim:DNzuwCet3MP8fOag@cluster0.rbyklg7.mongodb.net/";
const dbName = "co-drs-db";

export async function GET() {
  const client = new MongoClient(uri, {});

  try {
    await client.connect();
    const database = client.db(dbName);
    const conditions = database.collection("conditions");
    const allConditions = await conditions.find({}).toArray();
    return NextResponse.json(allConditions);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
