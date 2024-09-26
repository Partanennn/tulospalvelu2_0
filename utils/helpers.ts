export const HandleTempClick = <T, Y>(
  data: T[],
  tempData: Y[],
  setTempData: (data: T[]) => void
) => {
  if (tempData && tempData.length > 0) {
    setTempData([]);
  } else if (data && tempData && data.length > 0 && tempData.length === 0) {
    setTempData(data);
  }
};
