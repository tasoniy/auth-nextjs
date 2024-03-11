import { connect } from "@/dbConfig/dbCongig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from 'bcryptjs';

connect()


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(`ReqBody: ${reqBody}`);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        error: "User already exists"
      },
      {status: 400}
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    const savedUser = await newUser.save()
    console.log(`saved user: ${savedUser}`)
    return NextResponse.json({
      message:" User Created",
      success: true,
      savedUser
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}