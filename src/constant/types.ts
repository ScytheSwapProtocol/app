export enum AssetType {
  Null = "",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export interface AssetInfo {
  balance: number;
  type: AssetType;
  name?: string;
  contract: string;
}
