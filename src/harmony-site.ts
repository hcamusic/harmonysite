import axios, { AxiosInstance } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import qs from 'qs';
import { CookieJar } from 'tough-cookie';

interface HarmonySiteAuthoriseRequest {
  username: string;
  password: string;
  endpoint: 'authorise';
}

interface HarmonySiteBrowseRequest {
  [key: string]: string;
  token: string;
  endpoint: 'browse';
}

interface HarmonySiteConfigRequest {
  endpoint: 'config';
  token: string;
}

type HarmonySiteRequest =
  | HarmonySiteAuthoriseRequest
  | HarmonySiteBrowseRequest
  | HarmonySiteConfigRequest;

interface HarmonySiteResponseAttributes {
  "@attributes": {
    status: string;
  }
}

interface AuthoriseResponse {
  token: string;
}

type HarmonySiteResponse<Response> = Response & HarmonySiteResponseAttributes;

export class HarmonySite {
  private readonly axios: AxiosInstance;

  private token?: string;

  constructor(baseURL: string) {
    const jar = new CookieJar();
    this.axios = wrapper(axios.create({
      baseURL,
      jar,
    }));
  }

  public async request<Response>(endpoint: string, data: any): Promise<HarmonySiteResponse<Response>> {
    if (endpoint !== 'authorise' && !this.token) {
      throw new Error('Unable to authorise request, call authorise() first');
    }

    const formData = {
      ...data,
      token: this.token,
      output: "json",
      endpoint,
    } as HarmonySiteRequest;

    const result = await this.axios( {
      method: "POST",
      url: '/api',
      data: qs.stringify(formData),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });

    const response = result.data as HarmonySiteResponse<Response>;

    if (response["@attributes"].status !== "okay") {
      throw new Error(`Unknown error requesting ${endpoint}: ${JSON.stringify(response)}`);
    }

    return response;
  }

  public async authorise(username: string, password: string): Promise<HarmonySiteResponse<AuthoriseResponse>> {
    const result = await this.request<AuthoriseResponse>('authorise', { username, password });
    this.token = result.token;

    return result;
  }

  public async browse(data: any): Promise<HarmonySiteResponse<any>> {
    return this.request<AuthoriseResponse>('browse', data);
  }

  public config() {
    return this.request<AuthoriseResponse>('config', {});
  }
}
