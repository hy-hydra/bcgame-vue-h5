import { defineStore } from "pinia";

type TCustomerList = {
  icon: string;
  config: string;
  remark: string;
};

type TInformationList = {
  title: string;
  content: string;
  startTime: string;
  endTime: string;
};
type TConfigStore = {
  icon: string;
  name: string;
  title: string;
  customerList: Array<TCustomerList>;
  informationList: Array<TInformationList>;
};

export const useConfigStore = defineStore({
  id: "config",
  persist: true,
  state: (): TConfigStore => ({
    icon: "",
    name: "",
    title: "",
    customerList: [],
    informationList: []
  }),
  actions: {
    setMetaData({
      title,
      name,
      icon
    }: {
      title: string;
      name: string;
      icon: string;
    }) {
      this.title = title;
      this.name = name;
      this.icon = icon;
    },
    setCustomerList(list: Array<TCustomerList>) {
      this.customerList = list;
    },
    setInformationList(list: Array<TInformationList>) {
      this.informationList = list;
    }
  }
});
