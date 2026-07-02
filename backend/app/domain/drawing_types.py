"""Drawing types covered by validation engine."""

from enum import StrEnum


class DrawingType(StrEnum):
    FLOOR_PLAN_LAYOUT = "floor_plan_layout"
    FLOOR_PLAN_CENTRELINE = "floor_plan_centreline"
    FLOOR_PLAN_WORKING = "floor_plan_working"
    STAIRCASE_DETAIL = "staircase_detail"
    ELEVATOR_DETAIL = "elevator_detail"
    RAMP_DETAIL = "ramp_detail"
    SECTION = "section"
    ELEVATION = "elevation"
    MISC_DETAIL = "misc_detail"
    DOOR_SCHEDULE = "door_schedule"
    WINDOW_SCHEDULE = "window_schedule"
    AREA_STATEMENT = "area_statement"
    REFLECTED_CEILING_PLAN = "reflected_ceiling_plan"
    UNKNOWN = "unknown"


class Typology(StrEnum):
    OFFICE = "office"
    RESIDENTIAL = "residential"
    RETAIL = "retail"
    HOSPITALITY = "hospitality"
    HEALTHCARE = "healthcare"
