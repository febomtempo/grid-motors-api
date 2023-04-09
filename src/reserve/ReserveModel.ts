import { Schema, model, Document } from 'mongoose';

export interface IReserve extends Document {
  start_date: Date;
  end_date: Date;
  id_user: Schema.Types.ObjectId;
  id_car: Schema.Types.ObjectId;
  final_value: number;
}

const reserveSchema: Schema = new Schema<IReserve>({
  start_date: {
    type: Date,
    required: [true, 'A reserve must have a start_date'],
  },
  end_date: {
    type: Date,
    required: [true, 'A reserve must have a end_date'],
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Reserve must belong to an User'],
  },
  id_car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'A Reserve must have a Car'],
  },
  final_value: {
    type: Number,
    required: [true, 'A reserve must have a final_value'],
  },
});

const Reserve = model<IReserve>('Reserve', reserveSchema);

export default Reserve;
