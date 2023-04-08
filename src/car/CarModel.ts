import { Schema, model, Document } from 'mongoose';

export interface ICar extends Document {
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: string[];
  number_of_passengers: number;
}

const accessoriesSchema: Schema = new Schema({
  description: {
    type: String,
    required: [true, 'An accessories must have a description'],
    trim: true,
    minlength: [2, 'A description must have more or equal then 2 characters'],
    maxlength: [40, 'A description must have less or equal then 40 characters'],
  },
});

const carSchema: Schema = new Schema<ICar>({
  model: {
    type: String,
    required: [true, 'A car must have a model'],
    trim: true,
    minlength: [2, 'A car model must have more or equal then 2 characters'],
    maxlength: [40, 'A car model must have less or equal then 40 characters'],
  },
  color: {
    type: String,
    required: [true, 'A car must have a color'],
    trim: true,
    minlength: [2, 'A car color must have more or equal then 2 characters'],
    maxlength: [20, 'A car color must have less or equal then 20 characters'],
  },
  year: {
    type: String,
    required: [true, 'A car must have a year'],
  },
  value_per_day: {
    type: Number,
    required: [true, 'A car must have an value_per_day'],
  },
  accessories: [accessoriesSchema],
  number_of_passengers: {
    type: Number,
    required: [true, 'A car must have a number_of_passengers'],
  },
});

const Car = model<ICar>('Car', carSchema);

export default Car;
