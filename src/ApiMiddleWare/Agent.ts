import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.headers.common = { "X-Requested-With": "XMLHttpRequest" };

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production" ? "http://localhost:5006/api/" : "";

axios.defaults.withCredentials = true;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string,params?:URLSearchParams) => axios.get(url,{params}).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

type MyErrorResponse = {
  errors: { detail: string }[];
};

axios.interceptors.response.use(
  async function (response) {
    if (process.env.NODE_ENV === "development") await sleep();

    return response;
  },
  function (error: AxiosError<MyErrorResponse>) {
    // console.log(`error ${error}`);
    toast.error(error.response.statusText);
    const { status, data } = error.response!;
    console.log("Error Agent = ", data);

    const navigate = useNavigate();
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key].detail);
            }
          }

          throw modelStateErrors.flat();
        }

        break;
      case 401:
        toast.error(error.response.toString());
        break;
      case 500:
        toast.error(error.response.toString());
        navigate("/server-error", { state: data });

        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

// axios.interceptors.response.use(
//   async (response) => {
//     // do somthing if its needed
//     // return response
//     if (process.env.NODE_ENV === "development") await sleep();

//     return response;
//   },
//   (error: AxiosError<MyErrorResponse>) => {
//     const { status, data } = error.response!;
//     console.log("Error Agent = ", status);

//     const navigate = useNavigate();
//     switch (status) {
//       case 400:
//         if (data.errors) {
//           const modelStateErrors: string[] = [];
//           for (const key in data.errors) {
//             if (data.errors[key]) {
//               modelStateErrors.push(data.errors[key].detail);
//             }
//           }
//           throw modelStateErrors.flat();
//         }

//         alert(400);
//         toast.error("400 Error");
//         break;
//       case 401:
//         toast.error(error.response.toString());
//         break;
//       case 500:
//         toast.error(error.response.toString());
//         navigate("/server-error", { state: data });

//         break;

//       default:
//         break;
//     }
//     return Promise.reject(error.response);
//   }
// );

const Catalog = {
  list: (params:URLSearchParams) => requests.get("Products",params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters:()=>requests.get('products/filters')
};

const Basket = {
  get: () => requests.get("basket"),

  addItem: (productId: number, quantity = 1) =>
  requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),

  deleteItem: (productId: number, quantity = 1) =>
  requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
};
const agent = {
  Catalog,
  Basket,
};

export default agent;
