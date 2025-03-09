import { TErrorSources, TGenericErrorResponse } from '../interface/error';
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const exactedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${exactedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleDuplicateError;
