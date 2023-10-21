// pages/api/getAllRaces.js

import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://vercel-admin-user:SYeGHPvKdcucdq3B@cluster0.oqham14.mongodb.net/?retryWrites=true&w=majority";
const dbName = "co-drs-db";

export async function GET() {
  const client = new MongoClient(uri, {});

  await client.connect();
  const database = client.db(dbName);
  const profiles = database.collection("profiles");
  const allProfiles = await profiles.find({}).sort({ slug: 1 }).toArray();
  return NextResponse.json(allProfiles);
}

// export async function POST(request: Request) {
//   const client = new MongoClient(uri, {});
//   const data = await request.json();
//   console.log("data --->", data);

//   try {
//     await client.connect();
//     const database = client.db(dbName);
//     const profiles = database.collection("profiles");
//     const result = await profiles.insertOne(data);

//     if (result.insertedId) {
//       return NextResponse.json({
//         success: true,
//         message: "Profile added successfully",
//       });
//     } else {
//       return NextResponse.json(
//         { success: false, message: "Failed to add profile" },
//         { status: 500 }
//       );
//     }
//   } finally {
//     await client.close();
//   }
// }

export async function POST(request: Request) {
  const client = new MongoClient(uri, {});
  const data = await request.json();
  console.log("data --->", data);

  try {
    await client.connect();
    const database = client.db(dbName);
    const profiles = database.collection("profiles");
    const abilities = database.collection("abilities");
    const ways = database.collection("ways");

    const insertedAbilities: ObjectId[] = [];

    // Upload abilities
    for (const way of data.ways) {
      for (const ability of way.abilities) {
        const abilityResult = await abilities.insertOne(ability);
        insertedAbilities.push(abilityResult.insertedId);
      }
    }

    // Upload ways with linked abilities
    const insertedWays: ObjectId[] = [];
    for (const way of data.ways) {
      const linkedAbilities = way.abilities.map((_: any, index: any) =>
        insertedAbilities.shift()
      );
      const wayResult = await ways.insertOne({
        name: way.name,
        abilities: linkedAbilities,
      });
      insertedWays.push(wayResult.insertedId);
    }

    // Upload profile with linked way
    const linkedWays = insertedWays.map((_, index) => insertedWays.shift());
    const result = await profiles.insertOne({
      ...data,
      ways: linkedWays,
    });

    if (result.insertedId) {
      return NextResponse.json({
        success: true,
        message: "Profile added successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to add profile" },
        { status: 500 }
      );
    }
  } finally {
    await client.close();
  }
}
