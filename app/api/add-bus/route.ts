import db from '@/lib/db';
import { NextResponse } from 'next/server';

// Define functions outside the block
function getRandomDestination(destinations:any) {
    return destinations[Math.floor(Math.random() * destinations.length)];
}

function getRandomShift(shifts:any) {
    return shifts[Math.floor(Math.random() * shifts.length)];
}

function getRandomName(name:any) {
    return name[Math.floor(Math.random() * name.length)];
}
function getRandomDate() {
    const startDate = new Date(2024, 3, 25); // April 25, 2024
    const endDate = new Date(2024, 3, 30);   // April 30, 2024
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split('T')[0]; // Extract only the date part
}
export async function GET() {
    try {
        // await db.bus.deleteMany()
    //     const names = [
    //         "Evergreen Travels",
    //         "Golden Arrow",
    //         "Silver Lining Express",
    //         "Red Star Bus Lines",
    //         "Blue Sky Coaches",
    //         "Green Valley Transport",
    //         "Yellow Bird Transit",
    //         "Rainbow Tours",
    //         "Sunset Express",
    //         "Moonlight Buses",
    //       ];
    //     const destinations = [
    //         "Pokhara", 
    //         "Dharan", 
    //         "Hemja", 
    //         "Bhaktapur", 
    //         "Lumbini", 
    //         "Chitwan", 
    //         "Namche Bazaar", 
    //         "Gosaikunda", 
    //         "Janakpur", 
    //         "Nagarkot"
    //     ];
          
    //     const shifts = ["Day", "Night"];
          
    //     const bus = [];
          
    //     for (let i = 0; i < 100; i++) {
    //         const entry = {
    //             from:getRandomDestination(destinations),
    //             name:getRandomName(names),
    //             to: getRandomDestination(destinations),
    //             shift: getRandomShift(shifts),
    //             date: new Date(getRandomDate()), 
    //         };
    //         bus.push(entry);
    //     }
    //       console.log(bus);
    // const allBus=  await db.bus.createMany({
    //     data:bus
    //   })
const allBus=await db.bus.findMany()
        return NextResponse.json({ allBus });
    } catch (error) {
        console.log(error);  
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
