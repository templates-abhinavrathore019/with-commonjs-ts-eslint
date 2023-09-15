import { ResponseType } from '../../types/response';
import { HttpRequest } from '../../helpers/http-request';
import {
  API,
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import apiConfiguration = require('../../configs/api');
import { parseCatAttributes } from '../../utils/cats/attr-util';
import { logger } from '../../utils/logger';

const { apiConfig } = apiConfiguration;

type GetCatByIdParamsType = {
  id: string | number;
};

type GetCatByIdResultType = ResponseType & {
  data: {
    cat?: any
  },
};

const getCatById = async (params: GetCatByIdParamsType) => {
  const {
    id,
  } = params;

  const res: GetCatByIdResultType = {
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
    res.message = 'Cat not found';

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

  const parsedResponse = parseCatAttributes(breed);

  result = {
    ...result,
    breedId: breed.id,
    breedName: breed.name,
    breedDescription: breed.description,
    ...parsedResponse,
  };

  res.data.cat = result;
  return res;
};

export {
  getCatById,
};
