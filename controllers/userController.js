export const updatePost = async(req, res) => {
    let response = req.body;
    let combined = {...req.user, ...req.body };
    if (req.user.password !== combined.password) {
        combined.password = hashSync(combined.password, 12);
    }
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};