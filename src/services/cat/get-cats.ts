import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
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

type GetCatsParamsType = {
  page: undefined | number;
  limit: undefined | number
};

type GetCatsResultType = ResponseWithPageType & {
  data: {
    cats?: any[]
  },
};

const getCats = async (params: GetCatsParamsType) => {
  const {
    page = 1,
    limit = 10,
  } = params;

  const res: GetCatsResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      totalCount: TOTAL_RECORDS,
      cats: [],
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
    res.data.cats = [];
    return res;
  }

  res.data.cats = response;
  return res;
};

export {
  getCats,
};
