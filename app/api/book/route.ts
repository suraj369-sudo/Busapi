import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {userId,busId}=await req.json();
        await db.bookings.create({
            data:{
                busId,
                userId
            }
        })
        return NextResponse.json({message:"Successfully placed booking"},{status:200})

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error},{status:500});
    }
}

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

   
     const bokings=   await db.bookings.findMany({ 
            where:{
                userId:user.userId
            },
            include:{
                Bus:true
            }
        })
        return NextResponse.json({message:"Successfully fetched booking",bokings},{status:200})

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error},{status:500});
    }
}