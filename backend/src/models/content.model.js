import mongoose from "mongoose";

const contentSchema = new mongoose(
    {
        title: {
            type: String, 
            required: true
        },

        body: { 
            type: String 
        },

        appSpecificContent: {
            type: Schema.Types.Mixed
        },
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true 
        }

    },

    {timestamps: true}
)

const Content = mongoose.model('Content', contentSchema)


export default Content