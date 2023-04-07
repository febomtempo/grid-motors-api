import { Response } from 'express';

export const errorMessage = (err: unknown): err is { message: string } => {
  if (err && typeof err === 'object' && 'message' in err) {
    return true;
  } else {
    return false;
  }
};

export const errorHandler = (err: unknown, res: Response) => {
  if (errorMessage(err)) {
    if (err.message.includes('ID not found')) {
      return res.status(404).json({
        status: 'fail',
        message: err.message,
      });
    }
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  return res.status(400).json({
    status: 'fail',
    message: err,
  });
};
