import moment from "moment-jalaali";

moment.loadPersian({
  dialect: "persian-modern",
  usePersianDigits: false, 
});

type JalaliFormat =
  | "jYY-jMM-jDD"
  | "jYYYY/jMM/jDD"
  | "jYYYY/jMM/jDD HH:mm"
  | "jD jMMMM jYYYY";

export function momentJalali(
  clock: string,                 // مثلا: "2025-12-08T12:24:05.780Z"
  format: JalaliFormat = "jYY-jMM-jDD",
  useUTC: boolean = true
) {
  const m = useUTC ? moment.utc(clock) : moment(clock);

  // moment-jalaali به locale فارسی نیاز داره
  m.locale("fa");

  // اعتبارسنجی
  if (!m.isValid()) return "-";

  return m.format(format);
}

// مثال:
// momentJalali("2025-12-08T12:24:05.780Z", "jYYYY/jMM/jDD HH:mm")
// momentJalali("2025-12-08T12:24:05.780Z", "jYYYY/jMM/jDD HH:mm", true) // UTC
