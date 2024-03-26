import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req:NextRequest){

    try {
        const {fullName,email,password}=await req.json()
        console.log(fullName,email,password);

        const existingEmail=await db.user.findUnique({
            where:{
                email
            }
        });

        if(existingEmail){
            return NextResponse.json({message:"User already exists"},{status:400})
        }

     const user=   await db.user.create({
            data:{
                email,
                fullName,
                password
            }
        })

        const token=uuidv4()

        await db.token.create({
            data:{
                token,
                userId:user.id
            }
        })
        

        return NextResponse.json({message:"User registered successfully",token},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Something went wrong",error},{status:500})
    }
}