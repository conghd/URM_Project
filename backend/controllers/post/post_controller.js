const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const PostModel = require('../../models/post_model')
const UpVoteModel = require('../../models/up_vote_model')
const DownVoteModel = require('../../models/down_vote_model')
const CommentModel = require('../../models/comment_model')
const path = require('path')

const uploadFile = require('../../middleware/upload_file_middleware')

const debugName = "PostController:";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/upload/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// @desc    Create a new post
// @route   POST  /api/post/create
// @access  Public

const upload = multer({storage: storage}).array("images", 16);

const createPost = asyncHandler(async (req, res) => {
  console.log("PostController::createPost")
  await upload(req, res, (err) => {
    if (err) {
      console.log("PostController::upload ERROR");
      res.status(400)
      throw new Error('Cannot upload files.')
    } else {
      const {content} = req.body;
      const paths = []
      for (const key in req.files) {
        paths.push("/images/" + req.files[key].filename);
      }
      
      const user = req.user._id;
      const post = PostModel.create({content: content, images:paths, user: user }, function(error, result){
        if (error) {
          res.status(400)
          throw new Error('Invalid post data')
        } else {
          res.json({ 'code': 200, 'message': 'createPost'})
        }
      })
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
const getPosts = asyncHandler(async (req, res) => {
  console.log("listPosts")
  const posts = await PostModel.find()
    .populate(['user', 'comments', 'upVotes', 'downVotes'])
    .sort({createdAt: -1})
    .exec();
  res.send(posts)
})

const getPost = asyncHandler(async (req, res) => {
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
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  voteUpPost,
  voteDownPost,
  commentPost,
  deleteComment,
}