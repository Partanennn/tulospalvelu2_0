export const handleTempClick = <T, Y>(
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

export const calculatePeriodMinutesAndSeconds = (
  gameTime: number,
  periodLength: number,
  period: number
) => {
  const minutes = String(
    Math.floor((gameTime % (periodLength * 60)) / 60)
  ).padStart(2, "0");
  const seconds = String((gameTime % (periodLength * 60)) % 60).padStart(
    2,
    "0"
  );

  return {
    minutes,
    seconds,
  };
};

export const getPeriodLengthFromRuleString = (ruleString: string): number =>
  parseInt(ruleString.split(";")[3]);
