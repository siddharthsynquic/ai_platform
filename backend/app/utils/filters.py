"""Query filter parsers — shared across list endpoints (site observations, drawings)."""

from datetime import date

from fastapi import Query
from pydantic import BaseModel


class DateRangeFilter(BaseModel):
    date_from: date | None = None
    date_to: date | None = None


def date_range(
    date_from: date | None = Query(default=None),
    date_to: date | None = Query(default=None),
) -> DateRangeFilter:
    return DateRangeFilter(date_from=date_from, date_to=date_to)


# TODO: extend with:
# - StageFilter (SD|DD|GFC + drawing_type)
# - SiteFilter (issue_type + severity + trade + status + responsible_party)
# - SearchQuery (q text + fields)
