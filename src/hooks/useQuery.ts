import { useQuery } from "react-query";

interface QueryPayload<T> {
  keyGroup: string[];
  apiCaller: Promise<T>;
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
  } = useQuery(keyGroup, () => apiCaller);

  return {
    data,
    status,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    isLoadingError,
  };
};
