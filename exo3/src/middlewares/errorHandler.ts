export class CustomError extends Error {
  code: number;
  errcode: string;
  error: string;

  constructor(code = 500, errcode = '', error = '') {
    super(error);
    this.name = 'CustomError';
    this.code = code;
    this.errcode = errcode;
    this.error = error;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  toJSON() {
    return {
      status: 'error',
      code: this.code,
      errcode: this.errcode,
      message: this.error
    };
  }

  log() {
    console.error(`[${this.code}] ${this.errcode}: ${this.error}`);
  }
}