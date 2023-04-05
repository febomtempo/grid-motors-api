import { Schema, model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  cpf: string;
  birth: Date;
  email: string;
  password: string;
  cep: string;
  qualified: string;
  patio: string | null;
  complement: string | null;
  neighborhood: string | null;
  locality: string;
  uf: string;
}

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    minlength: [4, 'A user name must have more or equal then 4 characters'],
    maxlength: [40, 'A user name must have less or equal then 40 characters'],
  },
  cpf: {
    type: String,
    required: [true, 'A user must have a cpf'],
    trim: true,
    minlength: [4, 'A user cpf must be equal to 11 characters'],
    maxlength: [11, 'A user cpf must be equal to 11 characters'],
  },
  birth: {
    type: Date,
    required: [true, 'A user must have a birth date'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [
      {
        validator: function (email: string) {
          return validator.isEmail(email);
        },
        message: 'Please provide a valid email',
      },
      {
        validator: async function (email: string) {
          const user = await User.findOne({ email });
          return !user;
        },
        message: 'This email address is already in use',
      },
    ],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [6, 'A user password must have more or equal then 6 characters'],
    validate: {
      validator: function (password: string) {
        return !password.includes(' ');
      },
      message: 'The password must not contain whitespaces',
    },
    select: false,
  },
  cep: {
    type: String,
    required: [true, 'A user must have a cep'],
    trim: true,
    minlength: [8, 'A cep must have 8 characters'],
    maxlength: [8, 'A cep must have 8 characters'],
  },
  qualified: {
    type: String,
    required: [true, 'Qualified field is required'],
    trim: true,
    minlength: [3, 'This field can only be sim or nao'],
    maxlength: [3, 'This field can only be sim or nao'],
  },
  patio: {
    type: String,
    trim: true,
    minlength: [2, 'A patio must have more or equal then 2 characters'],
    maxlength: [40, 'A patio must have less or equal then 40 characters'],
  },
  complement: {
    type: String,
    trim: true,
    minlength: [2, 'A patio must have more or equal then 2 characters'],
    maxlength: [40, 'A complement must have less or equal then 40 characters'],
  },
  neighborhood: {
    type: String,
    trim: true,
    minlength: [2, 'A patio must have more or equal then 2 characters'],
    maxlength: [40, 'A patio must have less or equal then 40 characters'],
  },
  locality: {
    type: String,
    trim: true,
    minlength: [2, 'A locality must have more or equal then 2 characters'],
    maxlength: [40, 'A locality must have less or equal then 40 characters'],
  },
  uf: {
    type: String,
    trim: true,
    minlength: [2, 'A locality must be equal to 2 characters'],
    maxlength: [2, 'A locality must be equal to 2 characters'],
  },
});

userSchema.pre('save', async function (this: IUser, next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
