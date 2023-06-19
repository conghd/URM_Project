const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const CommentModel = require('../../models/comment_model')
const path = require('path')
const PostModel = require('../../models/post_model')

const debugName = "CommentController:";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage}).array("images", 16);
// @desc    Create a new comment
// @route   POST  /api/comment/create
// @access  Public
const createComment = asyncHandler(async (req, res) => {
  console.log("CommentController::createComment")
  var content2, postId, userId;
  const paths = []
  await upload(req, res, (err) => {
    if (err) {
      res.status(400)
      throw new Error('Upload problem')
    } else {
      console.log(req.body);
      const { content, post } = req.body
      postId = post;
      userId = req.user._id;
      content2 = content;

      for (const key in req.files) {
        paths.push("/images/" + req.files[key].filename);
      }
    }
  })
    const postObj = await PostModel.findById(postId);
    console.log(postObj);

    const commentData = {
        content: content2 || "",
        post: postId || "",
        user: userId || "",
        images: paths,
    }
    console.log(commentData);

    const comment = await CommentModel.create(
      commentData, 
      function(error, result){
      if (error) {
        res.status(400)
        console.log(err);
        throw new Error('Invalid Commentisement')
      } else {
        if (postObj) {
          postObj.comments.push(result._id)
          postObj.save();
        }
        
        res.json(postObj)
      }
    })
})

// @desc    Update a post
// @route   POST /api/post/:id/update
// @access  Public
const updatePost = asyncHandler(async (req, res) => {
  res.json({ 'message': 'updatePost'})
})

// @desc    Delete a post
// @route   POST /api/post/:id/delete
// @access  Public
const deletePost = asyncHandler(async (req, res) => {
  console.info(debugName + "deletePost")
  res.json({ 'message': 'deletePost'})
})
// @desc    get Posts
// @route   POST  /api/post/list
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  console.log("listComments")
  const { postId } = req.body;
  var condition = {};
  if (postId ) {
    condition = {post: postId }
  } else {
  }
  console.log("Condition: " + JSON.stringify(condition));
  const comments = await CommentModel.find(condition)
    .sort({createdAt: -1})
    .exec();

  res.send(comments)
})

const getComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id;
  res.json({ 'message': 'getPost'})
})

const voteUpPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const voteUpData = {
    post: postId,
    user: userId,
  };

  const { vote_up } = req.body
  console.info(debugName + `:voteUpPost -- ${ vote_up }, ` + JSON.stringify(voteUpData))

  var error, result;
  const post = await PostModel.findById(postId).populate("upVotes").exec();
  if (!post) {
    res.status(400)
    throw new Error("Invalid post"); 
  }

  if (vote_up == true || vote_up == "True" || vote_up == "true" || vote_up == "TRUE") {
      await UpVoteModel.create(voteUpData, function(err, ret) {
        error = err; result = ret;
        if (!error) {
          post.upVotes.push(ret);
          post.save();
        }
      })
  } else {
    const upVote = await UpVoteModel.findOne({post: postId, user: userId })
    post.upVotes.pull({_id: upVote._id })
    await post.save();
    await UpVoteModel.deleteOne({_id: upVote._id });
  }

  if (error) {
    console.log(error)
    res.status(400)
  } else {
    res.json({ 'message': 'voteUpPost: done successfully!'})
  }
})

const voteDownPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const voteDownData = {
    post: postId,
    user: userId
  };

  const { vote_down } = req.body
  console.info(debugName + `:voteDownPost -- ${ vote_down }, ` + JSON.stringify(voteDownData))

  var error, result;
  const post = await PostModel.findById(postId);
  if (!post) {
    res.status(400)
    throw Error("Invalid post")
  }

  if (vote_down == true || vote_down == "True" || vote_down == "true" || vote_down == "TRUE") {
    await DownVoteModel.create(voteDownData, function(err, ret) {
      error = err; result = ret;
      if (!error) {
        post.downVotes.push(ret);
        post.save();
      } else {
      }
    })
  } else {
    const downVote = await DownVoteModel.findOne({user: userId, post: postId});
    post.downVotes.pull({ _id: downVote._id });
    await post.save();
    await DownVoteModel.deleteOne({_id: downVote._id })
  }

  if (error) {
    res.status(400)
    throw Error("Can not save down vote")
  } else {
    res.json({ 'message': 'voteDownPost:success'})
  }
})

const commentPost = asyncHandler(async (req, res) => {
  const user = req.user;
  const post_id = req.params.id;
  const commentData = {
    content: req.body.content,
    post: req.params.id,
    user: req.user._id
  }

  console.info(debugName + `:commentPost -- ` + JSON.stringify(commentData))
  const comment = new CommentModel(commentData);
  await comment.save((error) => {
  })

  await PostModel.findByIdAndUpdate(post_id,
    {$push: { comments: comment.id }},
    { new: true, useFindAndModify: false });

  res.json({ 'message': 'commentPost is OK', 'code': 200 })
})

const deleteComment = asyncHandler(async (req, res) => {
  console.info(debugName + `:deleteComment -- ` + JSON.stringify(req))
})

module.exports = {
  createComment,
  //updatePost,
  //deletePost,
  //getPost,
  getComments,
  ///voteUpPost,
  //voteDownPost,
  //commentPost,
  //deleteComment,
}