import { httpPost } from '@/utils/request'


export const walletList = () => httpPost('/user/finance/wallet');

export const bankList = (data) => httpPost('/user/finance/bankList',data);
export const bankCreate = (data) => httpPost('/user/finance/bankCreate',data);
export const postBankEdit = (data) => httpPost('/user/finance/bankEdit',data);
export const postCryptoList = (data) => httpPost('/user/finance/cryptoList',data);
export const postCreateCrypto = (data) => httpPost('/user/finance/cryptoCreate',data);

export const postCryptoEdit = (data) => httpPost('/user/finance/cryptoEdit',data);
export const getEnums = () => httpPost('/user/enums/code');


