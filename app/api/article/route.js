import connectDB from "@/lib/config/db";
import ArticleModel from "@/lib/models/articleModel";
import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import fs from "fs/promises";

const LoadDB = async () => {
  await connectDB();
};
LoadDB();

// API Endpoint to get all articles
export async function GET(request) {
  const slug = request.nextUrl.searchParams.get("slug");
  try {
    if (slug) {
      const article = await ArticleModel.findOne({ slug });
      return NextResponse.json({
        success: true,
        article,
      });
    } else {
      const articles = await ArticleModel.find().sort({ createdAt: -1 });
      return NextResponse.json({
        success: true,
        articles,
      });
    }
  } catch (error) {
    console.error("Error fetching articles:", error);

    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Failed to fetch articles",
      },
      { status: 500 }
    );
  }
}

// API Endpoint for creating a new article
export async function POST(request) {
  let imagePath = ""; // Store image path to delete later if needed
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    // Validate image
    const image = formData.get("image");
    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Image file is required",
        },
        { status: 400 }
      );
    }

    // Convert the image file to buffer
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Save image to disk
    imagePath = `./public/${timestamp}_${image.name}`; // Store image path for later deletion if needed
    await writeFile(imagePath, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    // Prepare the news data
    const newsData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: imgUrl,
      slug: formData.get("slug"),
      author: formData.get("author"),
    };

    // Insert article into the database
    await ArticleModel.create(newsData);
    console.log("News Data inserted successfully");

    // Return success response
    return NextResponse.json({
      success: true,
      message: "New Article inserted successfully",
    });
  } catch (error) {
    // If any error occurs, delete the uploaded image file
    if (imagePath) {
      try {
        await unlink(imagePath); // Remove the uploaded image file
        console.log(`Image file ${imagePath} deleted due to failure`);
      } catch (deleteError) {
        console.error("Failed to delete image file:", deleteError);
      }
    }

    // Improved error handling with detailed message and status code
    console.error("Error inserting article:", error);

    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Failed to insert article",
      },
      { status: 500 }
    );
  }
}

// API Endpoint for deleting an article
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    const article = await ArticleModel.findById(id);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Article not found",
        },
        { status: 404 }
      );
    }

    // Try to delete the image file
    try {
      await fs.unlink(`./public/${article.image}`);
    } catch (err) {
      console.error("Error deleting image file:", err.message);
    }

    // Delete the article after the image is handled
    await ArticleModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Failed to delete article",
      },
      { status: 500 }
    );
  }
}
