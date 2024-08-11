import { ref } from 'vue';

interface IOptions {
  defaultVisiable?: boolean;
  onShow?: (data?: any) => void;
  onClose?: (data?: any) => void;
  onSubmit?: (data?: any) => void;
}

const defaultOptions: IOptions = {
  // 默认显示/隐藏
  defaultVisiable: false,
  // 显示时执行
  onShow: () => { },
  // 关闭时执行
  onClose: () => { },
  // 确认时执行
  onSubmit: () => { },
};

export function useModal(options: IOptions = defaultOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  const { defaultVisiable, onShow, onClose, onSubmit } = mergedOptions;

  const open = ref<boolean>(defaultVisiable as boolean);

  const show = (data?: any): void => {
    if (onShow) {
      onShow(data);
    }
    open.value = true;
  };

  const close = (data?: any): void => {
    if (onClose) {
      onClose(data);
    }
    open.value = false;
  };

  const submit = (data?: any): void => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return {
    open,
    show,
    close,
    submit,
  };
}
