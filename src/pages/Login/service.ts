import { request } from 'umi';
import type { LoginParams } from './data';

/** 登录接口 POST /login */
export async function login(params: LoginParams) {
  return request<API.HttpResponse>('/login', {
    method: 'POST',
    data: params,
  });
}
