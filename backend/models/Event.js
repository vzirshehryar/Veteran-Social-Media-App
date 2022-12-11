import mongoose from 'mongoose';

const Event = new mongoose.Schema({
	content: String,
	owner: String,
    location: String,
    city: String,
    type: String,
	interested: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Veteran"
		}
	],
	attended: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Veteran"
		}
	],
	stars: Number,
});

export default mongoose.model("Event", Event);