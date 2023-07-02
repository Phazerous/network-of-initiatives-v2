export default function getStatus(statusCode: number) {
  switch (statusCode) {
    case 0:
      return {
        statusText: 'На проверке',
        statusColor: '#FF0000',
      };
    case 1:
      return {
        statusText: 'Одобрено',
        statusColor: '',
      };
    case 2:
      return {
        statusText: 'Отклонено',
        statusColor: '',
      };
  }
}
