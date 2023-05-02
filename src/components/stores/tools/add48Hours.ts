export function add48Hours(nowDate: Date) {
  nowDate.setDate(nowDate.getDate() + 2);
  return nowDate;
}
