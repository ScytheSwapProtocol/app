import { useEthers } from "@usedapp/core";
import { ETHPLORER_API } from "constant";
import useSWR from "swr";

const useAddressInfo = () => {
  const { account } = useEthers();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `${ETHPLORER_API.MAINNET}getAddressInfo/${account}?apiKey=freekey`,
    fetcher
  );

  return [data, error];
};

export default useAddressInfo;
