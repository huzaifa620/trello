import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
    const { todos } = await request.json()

    const response = await openai.chat.completions.create({
       model: "gpt-3.5-turbo",
       temperature: 0.8,
       n: 1,
       stream: false,
       messages: [
        {
            role: "system",
            content: `When responding, welcome the user always as Mr.Huzaifa and say welcome to the AI Trello! Limit the response to 200 characters`,
        },
        {
            role: "user",
            content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as to do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(todos)}`
        }
       ] 
    })

    return NextResponse.json(response.choices[0].message)

}
