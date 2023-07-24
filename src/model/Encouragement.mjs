import { Schema, model } from 'mongoose';

// Create a schema for the inspirational/encouraging messages
const encouragementSchema = new Schema({
    message: String,
});

export default model('Encouragement', encouragementSchema, 'inspireWords');