import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req:NextRequest){

    try {
        const {email,password}=await req.json()

        const existingEmail=await db.user.findUnique({
            where:{
                email
            }
        });

        if(!existingEmail){
            return NextResponse.json({message:"User doesnot exists"},{status:400})
        }

     
const checkPassworrd=password==existingEmail.password
if(!checkPassworrd){
    return NextResponse.json({message:"Password doesnot match"},{status:400})
}

        const token=uuidv4()

        
        await db.token.create({
            data:{
                token,
                userId:existingEmail.id
            }
        })

       
        

        return NextResponse.json({message:"User loggedin successfully",token},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Something went wrong",error},{status:500})
    }
}