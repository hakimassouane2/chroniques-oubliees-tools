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
    const races = database.collection("races");
    const allRaces = await races.find({}).toArray();
    return NextResponse.json(allRaces);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}