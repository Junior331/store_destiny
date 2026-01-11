export interface Server {
  id: string;
  name: string;
  slug: string;
}

export interface ServerPageParams {
  params: {
    server: string;
  };
}
