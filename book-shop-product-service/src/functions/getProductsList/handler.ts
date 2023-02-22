import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  return formatJSONResponse({
    message: `Hello getProductsList`,
    event,
  });
};

export const main = middyfy(getProductsList);