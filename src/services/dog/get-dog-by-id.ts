import { ResponseType } from '../../types/response';
import { HttpRequest } from '../../helpers/http-request';
import apiConfiguration = require('../../configs/api');
import {
  API,
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { parseDogAttributes } from '../../utils/dogs/attr-util';
import { logger } from '../../utils/logger';

const { apiConfig } = apiConfiguration;

type GetDogByIdParamsType = {
  id: string | number;
};

type GetDogByIdResultType = ResponseType & {
  data: {
    dog?: any
  },
};

const getDogById = async (params: GetDogByIdParamsType) => {
  const {
    id,
  } = params;

  const res: GetDogByIdResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {},
  };

  const { response, error } = await new HttpRequest()
    .setBaseUrl(apiConfig.baseUrl)
    .setPath(`${API.BY_ID}/${id}`)
    .setLogger(logger)
    .get();

  if (error) {
    res.httpStatus = HTTPStatusCodes.OK;
    res.apiStatus = ApiStatusCodes.FAILED;
    res.message = 'Dog not found';

    return res;
  }

  if (!response) {
    return res;
  }

  let result: any = {
    id: response.id,
    url: response.url,
    width: response.width,
    height: response.height,
  };

  const breeds = response.breeds ?? [];
  const breed = (breeds.length >= 1) ? breeds[0] : {};

  const parsedResponse = parseDogAttributes(breed);

  result = {
    ...result,
    breedId: breed.id,
    breedName: breed.name,
    breedDescription: breed.description,
    ...parsedResponse,
  };

  res.data.dog = result;
  return res;
};

export {
  getDogById,
};
