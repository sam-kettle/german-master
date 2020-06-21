module.exports = {

    generateNewNoun: async (nounSchema) => {
        const count = await nounSchema.countDocuments()
        const random = Math.floor(Math.random() * count)
        return await nounSchema.findOne().skip(random)
    }

}