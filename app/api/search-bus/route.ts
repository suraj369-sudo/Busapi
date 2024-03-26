import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
       const from= req.nextUrl.searchParams.get("from");
       const to= req.nextUrl.searchParams.get("to");
       const date= req.nextUrl.searchParams.get("date");
       console.log(date,from,to);
       const parsedDate = new Date(date!);

       console.log(parsedDate);


       const getBus = await db.bus.findMany({
        where: {
            from: {
                equals: from!,
                mode: "insensitive"
            },
            to: {
                equals: to!,
                mode: "insensitive"
            },
            // Use Prisma's `equals` for exact match on date (without time component)
          
        }
    });

       return NextResponse.json({bus:getBus},{status:200});
        
    } catch (error) {
        console.log(error);  
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}