import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "config";

const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: `${config.api.host}/` }),
	endpoints: () => ({}),
});

export { api };
