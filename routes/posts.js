import express from "express"
import { Post } from '../models/post.js'
import { User } from '../models/users.js'
const router = express.Router()

//create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const post = await Post.create(newPost)
        if (post) {
            res.status(200).json({
                "msg": "post created successfully"
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//update post
router.put('/:id', async (req, res) => {
    try {
        const post = Post.findById(req.params.id)
        if (post.userId === req.body.userID) {
            const updatedPost = await Post.updateOne({ $set: req.body })
            if (updatedPost) {
                res.status(200).json({
                    "msg": "post updated successfully"
                })
            }
        } else {
            res.status(403).json("You can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }

})

//delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = Post.findById(req.params.id)
        if (post.userId === req.body.userID) {
            const updatedPost = await Post.deleteOne()
            if (updatedPost) {
                res.status(200).json({
                    "msg": "post deleted successfully"
                })
            }
        } else {
            res.status(403).json("You can delete only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }

})

//like and unlike a post
router.put('/:id/like', async (req, res) => {
    try {
        const likedPost = await Post.findById(req.params.id)
        if (!likedPost.likes.includes(req.body.userId)) {
            await likedPost.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json({ "msg": "Post has been liked" })
        } else {
            await likedPost.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json({ "msg": "Post has been disliked" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id, { img: 1, desc: 1, }).lean()
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json("Post not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get timeline post
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPost = await Post.find({ userId: currentUser._id })
        const friendPost = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )
        console.log(friendPost)
        console.log(userPost)
        res.status(200).json(userPost.concat(...friendPost))
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router
