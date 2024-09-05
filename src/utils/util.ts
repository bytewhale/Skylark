export function getCurrentDate(currentDate: { value: string }): void {
  const date = new Date();
  currentDate.value = `${date.getFullYear()}-${uniformStyle(date.getMonth() + 1)}-${uniformStyle(date.getDate())} `;
  currentDate.value += `${uniformStyle(date.getHours())}:${uniformStyle(date.getMinutes())}:${uniformStyle(date.getSeconds())} `;

  switch (date.getDay()) {
    case 0:
      currentDate.value += '星期日';
      break;
    case 1:
      currentDate.value += '星期一';
      break;
    case 2:
      currentDate.value += '星期二';
      break;
    case 3:
      currentDate.value += '星期三';
      break;
    case 4:
      currentDate.value += '星期四';
      break;
    case 5:
      currentDate.value += '星期五';
      break;
    case 6:
      currentDate.value += '星期六';
      break;
    default:
      currentDate.value += '超级幸运日';
      break;
  }
}

function uniformStyle(value: number): string {
  return value.toString().padStart(2, '0');
}

export function formatDate(dateString: string, onlyDate = false) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = uniformStyle((date.getMonth() + 1)); // 月份从 0 开始，所以要加 1
  const day = uniformStyle(date.getDate())

  if (onlyDate) {
    return `${year}-${month}-${day}`;
  }

  const hours = uniformStyle(date.getHours());
  const minutes = uniformStyle(date.getMinutes());
  const seconds = uniformStyle(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function formatMoney(value: number, digi = 2): string {
  if (typeof value == 'number') {
    return `¥${value.toFixed(digi)}`
  }
  return `¥${Number(value).toFixed(digi)}`
}

