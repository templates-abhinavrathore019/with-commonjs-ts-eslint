import { ResponseWithPageType } from '../../types/response';
import { HttpRequest } from '../../helpers/http-request';
import apiConfiguration = require('../../configs/api');
import {
  API,
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { logger } from '../../utils/logger';

const { apiConfig } = apiConfiguration;

// total records available in db
const TOTAL_RECORDS = 10;

type GetDogsParamsType = {
  page: undefined | number;
  limit: undefined | number
};

type GetDogsResultType = ResponseWithPageType & {
  data: {
    dogs?: any[]
  },
};

const getDogs = async (params: GetDogsParamsType) => {
  const {
    page = 1,
    limit = 10,
  } = params;

  const res: GetDogsResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      totalCount: TOTAL_RECORDS,
      dogs: [],
    },

  };

  const { response, error } = await new HttpRequest()
    .setBaseUrl(apiConfig.baseUrl)
    .setPath(API.LIST)
    .addReqParams({
      page,
      limit,
      has_breeds: 1,
    })
    .setLogger(logger)
    .get();

  if (error) {
    res.httpStatus = HTTPStatusCodes.OK;
    res.apiStatus = ApiStatusCodes.FAILED;
    res.message = 'No results found';
    res.data.totalCount = 0;
    res.data.dogs = [];
    return res;
  }

  res.data.dogs = response;
  return res;
};

export {
  getDogs,
};
