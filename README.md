using aggregation how to get data 
// 1. get data from database
// 2. aggregate data
// 3. return aggregated data
example

  const users = await User.find().aggregate([
   {
    $lookup: {
      from: "posts", // The posts collection
      localField: "_id", // User ID in users collection
      foreignField: "userId", // User ID in posts collection
      as: "posts" // Output field for the user's posts
    }
  },
  {
    $unwind: {
      path: "$posts",
      preserveNullAndEmptyArrays: true // Keep users with no posts
    }
  },
  {
    $lookup: {
      from: "likes", // Assuming likes are in a separate collection
      localField: "posts._id", // Post ID in posts collection
      foreignField: "postId", // Post ID in likes collection
      as: "likes" // Add likes to each post
    }
  },
  {
    $lookup: {
      from: "comments", // Assuming comments are in a separate collection
      localField: "posts._id", // Post ID in posts collection
      foreignField: "postId", // Post ID in comments collection
      as: "comments" // Add comments to each post
    }
  },
  {
    $group: {
      _id: "$_id", // Group by user ID
      name: { $first: "$name" }, // Include user name
      posts: { 
        $push: {
          title: "$posts.title", // Post fields
          content: "$posts.content", // Post fields
          likeCount: { $size: "$likes" }, // Count of likes
          commentCount: { $size: "$comments" } // Count of comments
        }
      },
      totalPosts: { $sum: 1 } // Count total number of posts
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      totalPosts: 1,
      posts: 1 // Include posts with like and comment counts
    }
  }
])

