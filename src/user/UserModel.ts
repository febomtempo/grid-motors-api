import { Schema, model, Document, Query, CallbackError } from 'mongoose';
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
  correctPassword(candidatePassword: string): Promise<boolean>;
}

interface IUserQuery extends Query<IUser, IUser> {
  _update: {
    password?: string;
  };
}

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    minlength: [2, 'A user name must have more or equal then 2 characters'],
    maxlength: [40, 'A user name must have less or equal then 40 characters'],
  },
  cpf: {
    type: String,
    required: [true, 'A user must have a cpf'],
    unique: true,
    trim: true,
    minlength: [14, 'A user cpf must be equal to 14 characters'],
    maxlength: [14, 'A user cpf must be equal to 14 characters'],
    validate: [
      {
        validator: async function (cpf: string) {
          const user = await User.findOne({ cpf });
          return !user;
        },
        message: 'This cpf is already in use',
      },
    ],
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
    minlength: [3, `This field can only be 'sim' or 'não'`],
    maxlength: [3, `This field can only be 'sim' or 'não'`],
  },
  patio: {
    type: String,
    trim: true,
    required: true,
    minlength: [2, 'A patio must have more or equal then 2 characters'],
    maxlength: [40, 'A patio must have less or equal then 40 characters'],
  },
  complement: {
    type: String,
    trim: true,
    required: true,
    minlength: [2, 'A complement must have more or equal then 2 characters'],
    maxlength: [40, 'A complement must have less or equal then 40 characters'],
  },
  neighborhood: {
    type: String,
    trim: true,
    required: true,
    minlength: [2, 'A neighborhood must have more or equal then 2 characters'],
    maxlength: [
      40,
      'A neighborhood must have less or equal then 40 characters',
    ],
  },
  locality: {
    type: String,
    trim: true,
    required: true,
    minlength: [2, 'A locality must have more or equal then 2 characters'],
    maxlength: [40, 'A locality must have less or equal then 40 characters'],
  },
  uf: {
    type: String,
    trim: true,
    required: true,
    minlength: [2, 'A locality must be equal to 2 characters'],
    maxlength: [2, 'A locality must be equal to 2 characters'],
  },
});

userSchema.pre('save', async function (this: IUser, next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const query = this as IUserQuery;
    if (query._update.password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(query._update.password, salt);
      query._update.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
