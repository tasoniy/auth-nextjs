import { getDataFRomToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbCongig";

connect();


export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFRomToken(request)
    const user = await User.findOne({ _id: userID }).select("-password");
    return NextResponse.json({
      message: "User found",
      currentUser: user,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}