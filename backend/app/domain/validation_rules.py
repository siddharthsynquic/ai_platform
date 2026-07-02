"""Stage-specific validation rule catalog. Populated during Month 1 client sessions."""

from enum import StrEnum


class Severity(StrEnum):
    ERROR = "error"
    CAUTION = "caution"
    SUGGESTION = "suggestion"
    PRECISION_FLAG = "precision_flag"
    SPATIAL_FLAG = "spatial_flag"


class RuleCategory(StrEnum):
    SPATIAL_ADJACENCY = "spatial_adjacency"
    CIRCULATION = "circulation"
    PROGRAMME_COMPLIANCE = "programme_compliance"
    DIMENSIONAL_ACCURACY = "dimensional_accuracy"
    DETAIL_COMPLETENESS = "detail_completeness"
    ANNOTATION = "annotation"
    DRAWING_CONSISTENCY = "drawing_consistency"
    DRAFTING_STANDARDS = "drafting_standards"
    CROSS_SHEET_REFERENCE = "cross_sheet_reference"
    SCHEDULE_VALIDATION = "schedule_validation"
    CONSTRUCTION_READINESS = "construction_readiness"
    REVISION_CONTROL = "revision_control"
