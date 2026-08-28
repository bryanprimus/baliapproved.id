import * as React from "react";

const MS_PER_DAY = 86_400_000;

function daysSince(isoDate: string) {
  const start = Date.parse(`${isoDate}T00:00:00+08:00`);
  if (Number.isNaN(start)) {
    return 0;
  }

  return Math.max(0, Math.floor((Date.now() - start) / MS_PER_DAY));
}

export function DaysAgo({ since }: { since: string }) {
  const [days, setDays] = React.useState(() => daysSince(since));

  React.useEffect(() => {
    setDays(daysSince(since));
  }, [since]);

  return (
    <>
      {days} {days === 1 ? "day" : "days"} ago
    </>
  );
}
