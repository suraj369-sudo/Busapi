import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
       const token=await req.headers
      const bearerToken=token.get("Authorization")?.split(" ")[1];
      const user=await db.token.findUnique({
        where:{
            token: bearerToken
        }
      });
      if(!user){
        return NextResponse.json({message:"Invalid token"},{status:400})
      }

      const userData=await db.user.findUnique({
        where:{
          id: user.userId!,
        }
      })

       
        return NextResponse.json({message:"Successfully fetched user", userData},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Something went wrong",error},{status:500})
        
    }
}