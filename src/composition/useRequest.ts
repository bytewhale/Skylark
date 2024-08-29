import { ref, type Ref } from 'vue';

interface IRequestOptions<T, P> {
  manual?: boolean;
  initialData?: T | null;
  defaultParams?: P | null;
  onSuccess?: ((data: T, params: P) => void) | null;
  onError?: ((error: any, params: P) => void) | null;
  formatResult?: ((response: any) => T) | null;
  formatParams?: ((params: any) => P) | null;
}

const defaultOptions: IRequestOptions<any, any> = {
  // 默认 false。 即在初始化时自动执行 service。
  // 如果设置为 true，则需要手动调用 run 触发执行。
  manual: false,
  // 默认的 data
  initialData: null,
  // 如果 manual=false ，自动执行 run 的时候，默认带上的参数
  defaultParams: null,
  //  service resolve 时触发，参数为 data 和 params
  // 如果有 formatResult ，则 data 为格式化后数据。
  onSuccess: null,
  // service 报错时触发，参数为 error 和 params。
  onError: null,
  // 格式化请求结果
  formatResult: null,
  // 格式化请求传值
  formatParams: null,
};

export function useRequest<T = any, P = any>(
  requestFn: (params: P) => Promise<any>,
  options: IRequestOptions<T, P> = defaultOptions
) {
  const mergedOptions: IRequestOptions<T, P> = { ...defaultOptions, ...options };

  const data = ref<T | undefined>(mergedOptions.initialData !== null ? mergedOptions.initialData : undefined) as Ref<T | undefined>;
  const error: Ref<any> = ref(undefined);
  const loading: Ref<boolean> = ref(false);

  const run = async (fetchParams?: P): Promise<any> => {
    if (loading.value) return;

    loading.value = true;

    let params: P;
    if (mergedOptions.formatParams) {
      params = mergedOptions.formatParams(fetchParams);
    } else {
      params = fetchParams || (mergedOptions.defaultParams as P) || {} as P;
    }

    try {
      const res = await requestFn({ ...params });

      data.value = mergedOptions.formatResult ? mergedOptions.formatResult(res) : res;
      if (mergedOptions.onSuccess) {
        mergedOptions.onSuccess(data.value as T, params);
      }
      return res;
    } catch (e) {
      error.value = e;
      if (mergedOptions.onError) {
        mergedOptions.onError(e, params);
      }
    } finally {
      loading.value = false;
    }
  };

  if (!mergedOptions.manual) {
    run();
  }

  return {
    data,
    loading,
    error,
    run,
  };
}
