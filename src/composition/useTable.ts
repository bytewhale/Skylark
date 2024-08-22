import { useRequest } from './useRequest';
import { reactive, ref, computed, onMounted, toRefs, type Ref } from 'vue';

interface Pagination {
  currentKey: string;
  pageSizeKey: string;
  totalKey: string;
  listKey: string;
}

interface Options {
  defaultPage?: {
    page: number;
    pageSize: number;
  };
  defaultParams?: Record<string, any>;
  manual?: boolean;
  pageSizeDisabled?: boolean;
  formatData?: (params: Record<string, any>) => Record<string, any>;
  formatResult?: () => void;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  pagination?: Pagination;
}

const defaultPagination: Pagination = {
  currentKey: 'page',
  pageSizeKey: 'pageSize',
  totalKey: 'total',
  listKey: 'list',
};

const defaultOptions: Options = {
  defaultPage: {
    page: 1,
    pageSize: 10,
  },
  defaultParams: {},
  manual: false,
  pageSizeDisabled: false,
  formatData: undefined,
  formatResult: undefined,
  onSuccess: undefined,
  onError: undefined,
  pagination: defaultPagination,
};

export function useTable<T>(requestFn: (params: any) => Promise<T>, options: Options = defaultOptions) {
  options = { ...defaultOptions, ...options };
  const { page: defaultPage, pageSize: defaultPageSize } = options.defaultPage!;
  const pagination = { ...defaultPagination, ...options.pagination };

  const page = reactive({
    page: defaultPage,
    pageSize: defaultPageSize,
  });
  const searchParams = reactive({ ...options.defaultParams });

  const list = ref<T[]>([]);
  const total = ref(0);

  const { data, loading, error, run } = useRequest(requestFn, {
    manual: true,
    onSuccess: (response) => {
      if (options.onSuccess) {
        options.onSuccess(response);
      } else {
        total.value = response.data[pagination.totalKey];
        list.value = response.data[pagination.listKey];
        options.formatResult?.();
      }
    },
  });

  const refresh = (value?: Record<string, any>) => {
    const params = { ...searchParams, ...value };
    const postData = options.formatData
      ? options.formatData({ [pagination.currentKey]: page.page, [pagination.pageSizeKey]: page.pageSize, ...params })
      : {
        ...params,
        [pagination.currentKey]: page.page,
        ...(options.pageSizeDisabled ? {} : { [pagination.pageSizeKey]: page.pageSize }),
      };
    run(postData);
  };

  const pageChange = (pag: { page: number; pageSize: number }, _filters: any, sorter: { order?: string; columnKey?: string }) => {
    page.pageSize = pag.pageSize;
    page.page = pag.page;
    refresh();
  };

  const search = (data: Record<string, any>) => {
    page.page = 1;
    Object.assign(searchParams, data);
    refresh();
  };

  const pageInfo = computed(() => ({
    page: page.page,
    pageSize: page.pageSize,
    total: total.value,
  }));

  const tableProps = computed(() => ({
    dataSource: list.value,
    loading: loading.value,
    pagination: pageInfo.value,
    total: total.value,
  }));

  const tableMethods = computed(() => ({
    pageChange,
  }));

  onMounted(() => {
    if (!options.manual) {
      refresh();
    }
  });

  return {
    data,
    loading,
    error,
    pageInfo,
    list,
    searchParams: toRefs(searchParams),
    refresh,
    search,
    pageChange,
    tableProps,
    tableMethods,
  };
}
