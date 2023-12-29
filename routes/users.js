import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/users.js'
const router = express.Router()

//update user details 

router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(err)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.param.id, {
                $set: req.body
            })
            res.status(200).json("Account updated ")
        } catch (err) {
            return res.json(err)
        }
    } else {
        return res.status(403).json("you can only update your account")
    }
})

//get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0, updatedAt: 0 })

        if (user) { res.status(200).json(user) }
        else { res.status(404).json({ "msg": "user not found" }) }

    } catch (error) {
        res.status(500).json(error)
    }
})

//delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete({ _id: req.params.id })
            return res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you can delete only your account")
    }
})

//following updation
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.follower.includes(req.body.userId)) {
                await user.updateOne({ $push: { follower: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })

                res.status(200).json("user has been followed")
            } else {
                res.status(403).json("you already follows this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you cannot follow your self")
    }
})

//unfollow update
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.follower.includes(req.body.userId)) {
                await user.updateOne({ $pull: { follower: req.body.userId } })
                await currentUser.updateOne({ $pull: { following: req.params.id } })

                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json("you dont follows this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you cannot unfollow your self")
    }
})

export default router