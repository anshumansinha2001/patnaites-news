import { connectDB } from "@/lib/config/db";
import ArticleModel from "@/lib/models/articleModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

const LoadDB = async () => {
  await connectDB();
};
LoadDB();

export async function GET(request) {
  return NextResponse.json({ msg: "API working! " });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image) throw new Error("Image file is required");

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const newsData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: imgUrl,
      slug: formData.get("slug"),
      author: formData.get("author"),
    };

    await ArticleModel.create(newsData);
    console.log("News Data inserted successfully");

    return NextResponse.json({
      success: true,
      msg: "New Article inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting article:", error);

    return NextResponse.json({
      success: false,
      msg: error.message || "Failed to insert article",
    });
  }
}
