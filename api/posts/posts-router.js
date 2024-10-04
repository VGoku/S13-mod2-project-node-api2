// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
    Post.find()
    .then(found => {
        // throw new Error("ouch")
        res.json(found)
    })
    .catch(err => {
        res.status(500).json({
            message:  "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
})
router.get("/:id", async (req, res) => {
    try{
        // throw new Error("Very Bad Error!!")
        const post = await Post.findById(req.params.id)
        // console.log("------->", whatever);
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    }
})
router.post("/", (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        })
    } else {
        // console.log("success!!!")
        Post.insert({ title, contents })
        .then(({ id }) => {
            // console.log(id);
            return Post.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message,
                stack: err.stack,
            })
        })
        
    }
})
// router.delete("/:id", async (req, res) => {
//     try {
//         // throw new Error("Sad......")
//         const post = await Post.findById(req.params.id)
//         if (!post) {
//             res.status(404).json({
//                 message: "The post with the specified ID does not exist",
//             })
//         } else {
//             await Post.remove(req.params.id)
//             res.json(post)
//             console.log(numberOfDeletedPosts);
//         }
//     } catch (err) {
//         res.status(500).json({
//             message: "The post could not be removed",
//             err: err.message,
//             stack: err.stack,
//         })
//     }
// })
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(`Attempting to delete post with ID: ${req.params.id}`);

        if (!post) {
            return res.status(404).json({
                message: "The post with the specified ID does not exist",
            });
        } else {
            await Post.remove(req.params.id);
            console.log(`Deleted post: ${post}`);
            res.json(post);
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message,
            stack: err.stack,
        });
    }
});

router.put("/:id", (req, res) => {

})
router.get("/:id/messages", (req, res) => {

})


module.exports = router