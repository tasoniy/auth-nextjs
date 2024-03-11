import { connect } from "@/dbConfig/dbCongig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBoby = await request.json()
    const { email, password } = reqBoby;


    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "user does not exist" }, { status: 400 })
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: `Invalid password` }, { status: 400 })
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = await jwt.sign(tokenData,
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    )

    const response = NextResponse.json({
      message:"Login successful",
      success: true,
    })
    response.cookies.set("token", token, {
      httpOnly:true, 
      // path:"/"
    })
    return response
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}