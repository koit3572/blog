const getDateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours();
  const mins = date.getMinutes();
  const sec = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${mins}:${sec}`;
}
export default getDateFormat