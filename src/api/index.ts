import { projectAPIs } from "@/const/apis";
import request from "@/utils/request";

export async function queryProse(): Promise<any> {
  return request(projectAPIs.prose);
}
