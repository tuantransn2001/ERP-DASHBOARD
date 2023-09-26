import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { HttpResponseSuccess } from "src/services/httpService/types";

interface QueryPayload<T> {
  keyGroup: string[];
  apiCaller: Promise<AxiosResponse<T>>;
}

export const useMyQuery = <T>({ keyGroup, apiCaller }: QueryPayload<T>) => {
  const {
    data,
    status,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    isLoadingError,
    refetch,
  } = useQuery(keyGroup, () => apiCaller);

  const responseData = data as HttpResponseSuccess<T>;

  return {
    data: responseData,
    status,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    isLoadingError,
    refetch,
  };
};
