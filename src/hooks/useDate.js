import { format } from "date-fns";
import pl from "date-fns/locale/pl";

function useDate(date) {
  const result = format(new Date(date), "d MMMM yyyy", {
    locale: pl,
  });

  return result;
}

export default useDate;
