import mongoose from 'mongoose';

const Post = new mongoose.Schema({
	caption: String,
	imageUrl: {
		type: String
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Veteran"
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Veteran"
		}
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Veteran"
			},
			comment: {
				type:String,
				required: true
			}
		}
	]
});

export default mongoose.model("Post", Post);